import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, isString, IsString } from "class-validator";

export enum TaskStatus {
  ASSIGNED = 'ASSIGNED',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  BLOCKED = 'BLOCKED',
}

export enum TaskType {
  GENERAL = 'GENERAL',
  URGENT = 'URGENT'
}

export class AssignTaskDto {
  //    @ApiProperty({
  //     example: '8b4f82be-4b8d-45c9-aa4e-c91e020b',
  //     description: 'assignment id',
  //   })
  // @IsNotEmpty()
  // @IsString()
  // id : string;

   @ApiProperty({
      example: 'Visit Site A',
      description: 'Name of the task',
    })
  @IsNotEmpty()
  @IsString()
  task_name : string;

   @ApiProperty({
    example: TaskType.GENERAL,
    description: 'Type of the task',
  })
  @IsNotEmpty()
  @IsEnum(TaskType, {
    message:
      'task_type must be one of GENERAL, URGENT',
  })
  task_type : TaskStatus;

   @ApiProperty({
    example: 20,
    description: 'Time in minutes',
  })
  @IsNotEmpty()
  @IsNumber()
  estimation: number;

   @ApiProperty({
    example: 'd12395bf-aad8-4f3b-9716-fe6a6831b484',
    description: 'UUID',
  })
  @IsNotEmpty()
  @IsString()
  assigned_by: string;

   @ApiProperty({
    example: 'Visit Site A',
    description: 'Description of the task',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

   @ApiProperty({
    example: TaskStatus.ASSIGNED,
    description: 'Status of the task',
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus, {
    message:
      'task_status must be one of ASSIGNED, ACCEPTED, IN_PROGRESS, COMPLETED, REJECTED, BLOCKED',
  })
  task_status: TaskStatus;

   @ApiProperty({
    example: '12',
    description: 'ID of the task',
  })
  @IsNotEmpty()
  @IsNumber()
  task_id: number;

   @ApiProperty({
    example: '101',
    description: 'Emp code',
  })
  @IsNotEmpty()
  @IsString()
  employee_code: string;
}