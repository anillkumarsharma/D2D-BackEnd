import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { CreatePagesPermissionsDto, GetPagesPermissionsDto } from './dto/pages-permission.dto';

@Injectable()
export class PagesPermissionService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async updatePermission(data: CreatePagesPermissionsDto) {
  const { data: result, error } = await this.supabaseService.client
    .from('UserPortalAccess')
    .upsert({
    user_id:data.userId,
    access_page:data.pageName.replace(/\s+/g, ""),
    access_control:data.accessControl,
    created_by:data.assignedBy
    },{
      onConflict:"user_id,access_page",
      ignoreDuplicates: false,
    });
    if (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to update permission',
      );
    }
    return {
      message: 'Permission updated successfully',
      data: result,
    };
  }


  async getPermission(data: GetPagesPermissionsDto) {
  const { data: result, error } = await this.supabaseService.client
    .from('UserPortalAccess')
    .select('access_page, access_control')
    .eq('user_id', data.userId);

  if (error) {
    throw new InternalServerErrorException(
      error.message || 'Failed to fetch permission',
    );
  }

  const mappedPermissions: Record<string, boolean> = {};
  result?.forEach(item => {
    mappedPermissions[item.access_page] = item.access_control;
  });
  
  return {
    message: 'Permission fetched successfully',
    data: mappedPermissions,
  };
}

  
}
