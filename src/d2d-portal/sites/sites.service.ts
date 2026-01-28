import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { getPostgresTimestamp } from 'src/common/utils/created_at.util';

@Injectable()
export class SitesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getSitesDataService(){
    const {data, error} = await this.supabaseService.client
    .from("Cities")
    .select('*')
    // 1️⃣ active first, inactive later
    .order("status", { ascending: true }) 
    // 2️⃣ alphabetical by city name
    .order("city_name", { ascending: true });

    if(error){
      throw new InternalServerErrorException(error.message)
    }
    return data;
  }

  async createNewSiteService(body: CreateSiteDto){
    const {data:existing, error:checkError} = await this.supabaseService.client
      .from('Cities')
      .select('city_id, city_code, city_name')
       .or(
      `city_code.eq.${body.site_code},city_name.eq.${body.site_name}`
      )
      .maybeSingle();

    if (checkError) {
      throw new InternalServerErrorException(checkError.message);
    }

    if (existing) {
      if (existing.city_code === body.site_code) {
        throw new ConflictException('Site code already exists');
      }
      if (existing.city_name === body.site_name) {
        throw new ConflictException('Site name already exists');
      }
      throw new ConflictException('Site already exists');
    }

    const {data,error} = await this.supabaseService.client
      .from('Cities')
      .insert([
        {
          city_code: body.site_code,
          city_name: body.site_name,
          status: body.status,
          created_by: body.created_by,
          created_at: getPostgresTimestamp(),
          // firebase_db_path: body.firebase_db_path ?? null,
        }
      ])
      .select()
      .single();

    if(error){
      throw new InternalServerErrorException(error.message)
    }
    return data;
  }
}
