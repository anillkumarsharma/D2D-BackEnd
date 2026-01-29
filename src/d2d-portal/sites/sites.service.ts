import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { getPostgresTimestamp } from 'src/common/utils/created_at.util';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getSitesDataService(){
    const {data, error} = await this.supabaseService.client
    .from("Sites")
    .select('*')
    // 1️⃣ active first, inactive later
    .order("status", { ascending: true }) 
    // 2️⃣ alphabetical by city name
    .order("site_name", { ascending: true });

    if(error){
      throw new InternalServerErrorException(error.message)
    }
    return data;
  }

  async createNewSiteService(body: CreateSiteDto){
    const {data:existing, error:checkError} = await this.supabaseService.client
      .from('Sites')
      .select('site_id, site_code, site_name')
       .or(
      `site_code.eq.${body.site_code},site_name.eq.${body.site_name}`
      )
      .maybeSingle();

    if (checkError) {
      throw new InternalServerErrorException(checkError.message);
    }

    if (existing) {
      if (existing.site_code === body.site_code) {
        throw new ConflictException('Site code already exists');
      }
      if (existing.site_name === body.site_name) {
        throw new ConflictException('Site name already exists');
      }
      throw new ConflictException('Site already exists');
    }

    const {data,error} = await this.supabaseService.client
      .from('Sites')
      .insert([
        {
          site_code: body.site_code,
          site_name: body.site_name,
          status: body.status,
          created_by: body.created_by,
          created_at: getPostgresTimestamp(),
        }
      ])
      .select()
      .single();

    if(error){
      throw new InternalServerErrorException(error.message)
    }
    return data;
  }

  async updateSiteService(siteId:number, body: UpdateSiteDto){
    const {site_name, status,firebase_db_path} = body;

    if(!siteId){
      throw new BadRequestException('Site id is required for update');
    }

    if(site_name){
      const{data: existing, error: checkError} = await this.supabaseService.client
        .from('Sites')
        .select('site_id')
        .eq('site_name', site_name)
        .neq('site_id', siteId)
        .maybeSingle();

      if(checkError){
        throw new InternalServerErrorException(checkError.message);
      }
      if(existing){
        throw new ConflictException('Site name already exists')
      }
    }

    const updatePayload:any ={}

    if(body.site_name !== undefined) updatePayload.city_name = site_name;
    if(body.status !== undefined) updatePayload.status = status;
    if(body.firebase_db_path !== undefined) updatePayload.firebase_db_path = firebase_db_path;

    if (Object.keys(updatePayload).length === 0) {
      throw new BadRequestException('No fields provided to update');
    }

    const {data: result,error} = await this.supabaseService.client
      .from('Sites')
      .update(updatePayload)
      .eq("site_id",siteId)
      .select()
      .maybeSingle();

    if(error){
      throw new InternalServerErrorException(error.message);
    }

    if (!result) {
      throw new NotFoundException('Site not found');
    }
    return result;
  }
}
