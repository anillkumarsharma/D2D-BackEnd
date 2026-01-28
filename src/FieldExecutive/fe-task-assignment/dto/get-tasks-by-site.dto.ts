import { IsNotEmpty, IsString } from 'class-validator';

export class GetTasksBySiteDto {
  @IsString()
  @IsNotEmpty()
  siteId: string;
}
export class FeTaskItemDto {
  id: string;

  task_id: number;
  task_name: string;

  task_type: 'GENERAL' | 'URGENT';

  estimation: number;

  description?: string;

  task_status:
    | 'ASSIGNED'
    | 'ACCEPTED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'REJECTED'
    | 'BLOCKED';

  assigned_by: string;
  assigned_at: string;
}
export class FeTaskSummaryDto {
  employee_code: string;

  total_tasks: number;

  total_estimation: number;

  tasks: FeTaskItemDto[];
}