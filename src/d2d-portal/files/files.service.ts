import { Injectable, InternalServerErrorException, UploadedFile } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';

@Injectable()
export class FilesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async uploadToStorage(
    file: Express.Multer.File,
    bucket: string,
    path: string,
  ) {
    const storage = this.supabaseService.client.storage.from(bucket);

    // 🔍 Check if file already exists
    const { data: existing } = await storage.list('', {
      search: path,
    });

    let error:any;

    if (existing && existing.length > 0) {
      // 🔥 File exists → UPDATE
      ({ error} = await storage.update(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      }));
    } else {
      // 🔥 File does not exist → UPLOAD
      ({ error } = await storage.upload(path, file.buffer, {
        contentType: file.mimetype,
      }));
    }

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const { data } = storage.getPublicUrl(path);

    return {
      url: data.publicUrl,
      path,
    };
  }
}