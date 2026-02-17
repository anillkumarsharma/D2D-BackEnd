import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { SupabaseService } from 'src/config/supabase.service';

@Injectable()
export class DepartmentService {
  private tableName = 'Departments';

  constructor(private readonly supabaseService: SupabaseService) { }

  async saveDepartment(body: CreateDepartmentDto) {
    const payload = {
      ...body,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message || 'Failed to create department');
    }

    return data;
  };

  async getAllDepartments() {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .select(` id, branch_id, name, code, status, created_at, created_by`);

    if (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to fetch departments',
      );
    }
    return data;
  }

  async updateDepartment(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const payload = {
      ...updateDepartmentDto,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new NotFoundException('');
    };

    return data;
  };

  async deleteDepartment(id: number) {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new NotFoundException('Failed to delete department.')
    };

    return data;
  };
};
