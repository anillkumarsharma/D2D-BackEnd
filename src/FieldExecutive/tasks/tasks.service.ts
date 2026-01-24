import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task-dto';

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
      return result;
    }

  async updateTaskService(id: number,data : UpdateTaskDto){
    const updatePayload: any = {};

    if (data.taskName) updatePayload.task_name = data.taskName;
    if (data.description) updatePayload.description = data.description;

    if (Object.keys(updatePayload).length === 0) {
      throw new BadRequestException('No fields provided to update');
    }

    const {data : result, error} = await this.supabaseService.client
    .from("Tasks")
    .update(updatePayload)
    .eq('id',id)
    .select()
    .single()

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!result) {
      throw new NotFoundException('Task not found');
    }

    return result;
  }

  async getAllTasksService(){
    const {data, error} = await this.supabaseService.client
    .from("Tasks")
    .select('*')
    .order('created_at', {ascending: true})

    if(error){
      throw new InternalServerErrorException(error.message)
    }

    const tasks = data?.map((task)=> ({
      id: task.id,
      taskName: task.task_name,
      description: task.description,
    }))

  return {
    count: data.length,
    tasks,
  };
  }
}
