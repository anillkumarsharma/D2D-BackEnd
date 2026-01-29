import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { CreateUserDto, UpdateUserDto } from './dto/user-management.dto';
import * as common from '../../common/utils/response.util'

@Injectable()
export class UserManagementService {
  constructor(private readonly supabaseService: SupabaseService) {}
  async CreateUser(body: CreateUserDto) {
    let randomPasword = common.generateRandomCode();
    let encrptpassword = common.encryptValue(randomPasword);
    let email = body.email?.toLowerCase();
    let encrptMail = common.encryptValue(email);
    let hashCode = common.generateHash(email);

      const {data:existing, error:checkError} = await this.supabaseService.client
          .from('Users')
          .select('id, hash_email,emp_code')
           .or(
          `hash_email.eq.${hashCode},emp_code.eq.${body.empCode}`
          )
          .maybeSingle();
    
        if (checkError) {
          throw new InternalServerErrorException(checkError.message);
        }
    
        if (existing) {
          if (existing.hash_email === hashCode) {
            throw new ConflictException('Email already exists');
          }
          if (existing.emp_code === body.empCode) {
            throw new ConflictException('Employee code already exists');
          }
          throw new ConflictException('User already exists');
        }
    const { data: result, error } = await this.supabaseService.client
      .from('Users')
      .insert({
        name: body.name,
        created_by: body.createdBy,
        status:body.status,
        user_type:body.userType,
        emp_code:body.empCode,
        is_superadmin:body.isSuperadmin,
        password:encrptpassword,
        email:encrptMail,
        hash_email:hashCode,
        created_at:common.formatDateTime()
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
     async getAllUsers() {
          const { data: result, error } = await this.supabaseService.client
       .from('Users')
       .select('id,name,status,user_type,is_superadmin,emp_code,email')
       if (error) {
         throw new InternalServerErrorException(
           error.message || 'Failed to fetch users',
         );
       }
       return result;
     }

      async UpdateUser(id: string,data : UpdateUserDto){
             
       }
}
