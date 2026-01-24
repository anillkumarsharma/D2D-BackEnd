import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly supabaseService: SupabaseService) {}

   async createTaskService(data:CreateTaskDto){
      const{data : result, error } = await this.supabaseService.client
        .from('Tasks')
        .insert({
          task_name: data.taskName,
          description: data.description,
        })
        .select()
        .single();
  
      if (error) {
        throw new InternalServerErrorException(
          error.message || 'Failed to create task',
        );
      }
      return {
        message: 'Task created successfully',
        data: result,
      };
    }
}
