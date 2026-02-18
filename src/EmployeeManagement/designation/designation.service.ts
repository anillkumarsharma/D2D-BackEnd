import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { SupabaseService } from 'src/config/supabase.service';

@Injectable()
export class DesignationService {
  private tableName = 'Designations';

  constructor(private readonly supabaseService: SupabaseService) { }

  async saveDesignation(departmentId: number, body: CreateDesignationDto) {
    const designationName = body.name?.trim();
    if (!designationName) {
      throw new BadRequestException('Designation name is required');
    }

    const { data: existingDesignation, error: existingDesignationError } =
      await this.supabaseService.client
        .from(this.tableName)
        .select('id')
        .eq('department_id', departmentId)
        .ilike('name', designationName)
        .limit(1);

    if (existingDesignationError) {
      throw new InternalServerErrorException(
        existingDesignationError.message || 'Failed to validate designation',
      );
    }

    if (existingDesignation && existingDesignation.length > 0) {
      throw new BadRequestException(
        'Designation with this name already exists in this department',
      );
    }

    const payload = {
      ...body,
      name: designationName,
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

  async updateDesignation(_departmentId: number, id: number, updateDesignationDto: UpdateDesignationDto) {
    const { data: currentDesignation, error: currentDesignationError } =
      await this.supabaseService.client
        .from(this.tableName)
        .select('id, name, department_id')
        .eq('id', id)
        .maybeSingle();

    if (currentDesignationError) {
      throw new InternalServerErrorException(
        currentDesignationError.message || 'Failed to fetch designation',
      );
    }

    if (!currentDesignation) {
      throw new NotFoundException('Designation not found');
    }

    let nextDesignationName = currentDesignation.name;
    if (updateDesignationDto.name !== undefined) {
      nextDesignationName = updateDesignationDto.name?.trim();
      if (!nextDesignationName) {
        throw new BadRequestException('Designation name is required');
      }
    }

    const { data: existingDesignation, error: existingDesignationError } =
      await this.supabaseService.client
        .from(this.tableName)
        .select('id')
        .eq('department_id', currentDesignation.department_id)
        .ilike('name', nextDesignationName)
        .neq('id', id)
        .limit(1);

    if (existingDesignationError) {
      throw new InternalServerErrorException(
        existingDesignationError.message || 'Failed to validate designation',
      );
    }

    if (existingDesignation && existingDesignation.length > 0) {
      throw new BadRequestException(
        'Designation with this name already exists in this department',
      );
    }

    const payload = {
      ...updateDesignationDto,
      department_id: currentDesignation.department_id,
      updated_at: new Date().toISOString(),
    };
    if (updateDesignationDto.name !== undefined) {
      payload.name = nextDesignationName;
    }

    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .update(payload)
      .eq('id', id)
      .select('id, department_id, name, created_at, created_by')
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to update designation',
      );
    }

    if (!data) {
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
