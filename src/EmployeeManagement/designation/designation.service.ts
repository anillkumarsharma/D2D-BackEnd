import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { SupabaseService } from 'src/config/supabase.service';

@Injectable()
export class DesignationService {
  private tableName = 'Designations';

  constructor(private readonly supabaseService: SupabaseService) { }

  async saveDesignation(departmentId: number, body: CreateDesignationDto) {
    const payload = {
      ...body,
      department_id: departmentId,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message || 'Failed to create designation');
    }

    return data;
  }

  async getAllDesignationsByDepartment(departmentId: number) {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .select('id, department_id, name, created_at, created_by')
      .eq('department_id', departmentId);

    if (error) {
      throw new InternalServerErrorException(error.message || 'Failed to fetch designations');
    };

    return data;
  };

  async updateDesignation(departmentId: number, id: number, updateDesignationDto: UpdateDesignationDto) {
    const payload = {
      ...updateDesignationDto,
      department_id: departmentId,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .update(payload)
      .eq('department_id', departmentId)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new NotFoundException('Designation not found');
    }

    return data;
  }

  async deleteDesignation(departmentId: number, id: number) {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .delete()
      .eq('department_id', departmentId)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new NotFoundException('Failed to delete designation');
    }

    return data;
  }
}
