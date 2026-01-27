import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { CreateBranchDto } from './dto/create-branches.dto';
import { UpdateBranchDto } from './dto/update-branches-dto';

@Injectable()
export class BranchesService {
  private tableName = 'Branches'; // Supabase table name

  constructor(private readonly supabaseService: SupabaseService) {}

  // GET ALL BRANCHES
  async getAllBranches() {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .select('*');

    if (error) {
      throw new InternalServerErrorException(error.message || 'Failed to fetch branches');
    }

    return data;
  }

  // GET BRANCH BY ID
  async getBranchById(id: number) {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single(); // Option 1: single object

    if (error) {
      throw new NotFoundException('Branch not found');
    }

    return data;
  }

  // CREATE BRANCH
  async createBranch(body: CreateBranchDto) {
    const payload = {
      ...body,
      created_at: new Date().toISOString(), // not-null field
    };

    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .insert(payload)
      .select()
      .single(); // single object

    if (error) {
      throw new InternalServerErrorException(error.message || 'Failed to create branch');
    }

    return data;
  }

  // UPDATE BRANCH
  async updateBranch(id: number, updateBranchDto: UpdateBranchDto) {
    const payload = {
      ...updateBranchDto,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .update(payload)
      .eq('id', id)
      .select()
      .single(); // single object

    if (error) {
      throw new NotFoundException('Branch not found');
    }

    return data;
  }

  // DELETE BRANCH
  async deleteBranch(id: number) {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .delete()
      .eq('id', id)
      .select()
      .single(); // single object

    if (error) {
      throw new NotFoundException('Branch not found');
    }

    return data;
  }
}
