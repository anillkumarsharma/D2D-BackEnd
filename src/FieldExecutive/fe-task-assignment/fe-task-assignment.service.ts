import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { FeTaskSummaryDto,FeTaskItemDto } from './dto/get-tasks-by-site.dto'

@Injectable()
export class FeTaskAssignmentService {
  private readonly logger = new Logger(FeTaskAssignmentService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  //Fetch FE task assignments grouped by employee_code for a given siteId
  async getTasksBySite(siteId: string): Promise<FeTaskSummaryDto[]> {
    this.logger.log(`Fetching FE task assignments for siteId=${siteId}`);

    try {
      //Step 1 :  Fetch employee codes mapped to site
      const { data: feMappings, error: feMappingError } =
        await this.supabaseService.client.from('FESiteAssignments').select('employee_code').eq('site_id', siteId);
        if (feMappingError) {
        this.logger.error(`Error fetching FE mappings for siteId=${siteId}`,feMappingError.message);
        throw new InternalServerErrorException('Failed to fetch site assignments');
      }
      
      if (!feMappings || feMappings.length === 0) {
        this.logger.warn(`No Field Executives found for siteId=${siteId}`);
        return [];
      }

      const employeeCodes = feMappings.map((row) => row.employee_code);
      this.logger.debug(`Employee codes found: ${employeeCodes.join(', ')}`);

      // STEP 2: Fetch task assignments for employees
      const { data: taskRows, error: taskError } =
        await this.supabaseService.client.from('FETaskAssignment').select(
            `
            id,
            employee_code,
            task_id,
            task_name,
            task_type,
            estimation,
            description,
            task_status,
            assigned_by,
            assigned_at
          `,
          )
          .in('employee_code', employeeCodes)
          .order('assigned_at', { ascending: false });

      if (taskError) {
        this.logger.error(`Error fetching task assignments for siteId=${siteId}`,taskError.message);
        throw new InternalServerErrorException('Failed to fetch task assignments');
      }

      if (!taskRows || taskRows.length === 0) {
        this.logger.warn(`No tasks found for siteId=${siteId}`);
        return employeeCodes.map((code) => ({
          employee_code: code,
          total_tasks: 0,
          total_estimation: 0,
          tasks: [],
        }));
      }

      //  STEP 3: Group & aggregate by employee_code
      const summaryMap: Record<string, FeTaskSummaryDto> = {};

      for (const row of taskRows) {
        const empCode = row.employee_code;

        if (!summaryMap[empCode]) {
          summaryMap[empCode] = {
            employee_code: empCode,
            total_tasks: 0,
            total_estimation: 0,
            tasks: [],
          };
        }

        const taskItem: FeTaskItemDto = {
          id: row.id,
          task_id: row.task_id,
          task_name: row.task_name,
          task_type: row.task_type,
          estimation: row.estimation,
          description: row.description,
          task_status: row.task_status,
          assigned_by: row.assigned_by,
          assigned_at: row.assigned_at,
        };

        summaryMap[empCode].tasks.push(taskItem);
        summaryMap[empCode].total_tasks += 1;
        summaryMap[empCode].total_estimation += row.estimation;
      }

      const result = Object.values(summaryMap);

      this.logger.log(`Successfully built task summary for siteId=${siteId}, FE count=${result.length}`);
       return result;
    } catch (error) {
      this.logger.error(
        `Unhandled error while fetching tasks for siteId=${siteId}`,
        error.stack,
      );
      throw error;
    }
  }
}