import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import {
  CreateSiteAssignmentDto,
  GetAssignedSiteDto,
  UnassignSiteDto,
} from './dto/site-assignment.dto';

@Injectable()
export class SiteAssignmentService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async AssignSite(data: CreateSiteAssignmentDto) {
    const { data: result, error } = await this.supabaseService.client
      .from('UserCityAccess')
      .insert({
        city_id: data.cityId,
        created_by: data.assignedBy,
        user_id: data.userId,
      })
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to assign site',
      );
    }
    return result;
  }

  async UnAssignSite(data: UnassignSiteDto) {
    const { data: result, error } = await this.supabaseService.client
      .from('UserCityAccess')
      .delete()
      .eq('id', data.id)
      .select();

    if (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to unassign site',
      );
    }
    return result;
    
  }

   async GetAssignedSites(data:GetAssignedSiteDto) {
       const { data: result, error } = await this.supabaseService.client
    .from('UserCityAccess')
    .select(` id, city_id, Sites ( site_name ) `)
    if (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to fetch sites',
      );
    }
    return (result || []).map((row) => {
      const site =
        Array.isArray(row.Sites) ? row.Sites[0] : row.Sites;

      return {
        id: row.id,
        site_id: row.city_id,
        site_name: site?.site_name ?? null,
      };
    });
  }
}
