import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { SupabaseService } from 'src/config/supabase.service';

@Injectable()
export class DepartmentService {
  private tableName = 'Departments';

  constructor(private readonly supabaseService: SupabaseService) { }

  async saveDepartment(body: CreateDepartmentDto) {
    const departmentName = body.name?.trim();
    const departmentCode = body.code?.trim();
    if (!departmentName) {
      throw new BadRequestException('Department name is required');
    }
    if (!departmentCode) {
      throw new BadRequestException('Department code is required');
    }

    const { data: existingDepartment, error: existingDepartmentError } =
      await this.supabaseService.client
        .from(this.tableName)
        .select('id')
        .ilike('name', departmentName)
        .limit(1);

    if (existingDepartmentError) {
      throw new InternalServerErrorException(
        existingDepartmentError.message || 'Failed to validate department',
      );
    }

    if (existingDepartment && existingDepartment.length > 0) {
      throw new BadRequestException(
        'Department with this name already exists',
      );
    }

    const { data: existingDepartmentCode, error: existingDepartmentCodeError } =
      await this.supabaseService.client
        .from(this.tableName)
        .select('id')
        .ilike('code', departmentCode)
        .limit(1);

    if (existingDepartmentCodeError) {
      throw new InternalServerErrorException(
        existingDepartmentCodeError.message || 'Failed to validate department code',
      );
    }

    if (existingDepartmentCode && existingDepartmentCode.length > 0) {
      throw new BadRequestException(
        'Department with this code already exists',
      );
    }

    const payload = {
      ...body,
      name: departmentName,
      code: departmentCode,
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
      .select(` id, name, code, status, created_at, created_by`);

    if (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to fetch departments',
      );
    }
    return data;
  }

  async updateDepartment(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const { data: currentDepartment, error: currentDepartmentError } =
      await this.supabaseService.client
        .from(this.tableName)
        .select('id, name, code')
        .eq('id', id)
        .single();

    if (currentDepartmentError || !currentDepartment) {
      throw new NotFoundException('Department not found');
    }

    let nextDepartmentName = currentDepartment.name;
    let nextDepartmentCode = currentDepartment.code;
    if (updateDepartmentDto.name !== undefined) {
      nextDepartmentName = updateDepartmentDto.name?.trim();
      if (!nextDepartmentName) {
        throw new BadRequestException('Department name is required');
      }
    }
    if (updateDepartmentDto.code !== undefined) {
      nextDepartmentCode = updateDepartmentDto.code?.trim();
      if (!nextDepartmentCode) {
        throw new BadRequestException('Department code is required');
      }
    }

    const { data: existingDepartment, error: existingDepartmentError } =
      await this.supabaseService.client
        .from(this.tableName)
        .select('id')
        .ilike('name', nextDepartmentName)
        .neq('id', id)
        .limit(1);

    if (existingDepartmentError) {
      throw new InternalServerErrorException(
        existingDepartmentError.message || 'Failed to validate department',
      );
    }

    if (existingDepartment && existingDepartment.length > 0) {
      throw new BadRequestException(
        'Department with this name already exists',
      );
    }

    const { data: existingDepartmentCode, error: existingDepartmentCodeError } =
      await this.supabaseService.client
        .from(this.tableName)
        .select('id')
        .ilike('code', nextDepartmentCode)
        .neq('id', id)
        .limit(1);

    if (existingDepartmentCodeError) {
      throw new InternalServerErrorException(
        existingDepartmentCodeError.message || 'Failed to validate department code',
      );
    }

    if (existingDepartmentCode && existingDepartmentCode.length > 0) {
      throw new BadRequestException(
        'Department with this code already exists',
      );
    }

    const payload = {
      ...updateDepartmentDto,
      updated_at: new Date().toISOString(),
    };
    if (updateDepartmentDto.name !== undefined) {
      payload.name = nextDepartmentName;
    }
    if (updateDepartmentDto.code !== undefined) {
      payload.code = nextDepartmentCode;
    }

    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new NotFoundException('Department not found');
    };

    return data;
  };

  async deleteDepartment(id: number) {
    const { data: designations, error: designationsError } =
      await this.supabaseService.client
        .from('Designations')
        .select('id')
        .eq('department_id', id)
        .limit(1);

    if (designationsError) {
      throw new InternalServerErrorException(
        designationsError.message || 'Failed to validate department delete',
      );
    }

    if (designations && designations.length > 0) {
      throw new BadRequestException(
        'Department cannot be deleted as it has associated designations.',
      );
    }

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
