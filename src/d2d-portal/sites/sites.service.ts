import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';

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
}
