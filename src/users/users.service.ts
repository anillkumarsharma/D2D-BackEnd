import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createUser(data:any) {
    const { data: result, error } =
      await this.supabaseService.client
        .from('users')
        .insert(data)
        .select();

    if (error) throw error;
    return result;
  }
}
