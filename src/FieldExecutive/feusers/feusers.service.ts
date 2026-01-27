import { Injectable, } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { AssignSiteDto, ChangeFEStatusDto, GetAllowedSitesDto, GetEmployeeByCodeDto, SaveFEAppAccessDto } from './dto/fe-users.dto';
import { formatDateTime } from 'src/common/utils/response.util';

import { SendFEAppAccessMailDto } from 'src/common/mail-api/dto/send-mail.dto';
import { MailApiService } from 'src/common/mail-api/mail-api.service';

@Injectable()
export class FeusersService {
    constructor(private readonly supabaseService: SupabaseService, private readonly mailApiService: MailApiService) { }
    /**
     * Get allowed sites for manager
     * Author: Ritik Parmar
     * Date: 27 Jan 2026
     *
     * Uses UserCityAccess to fetch city_ids
     * and Cities table to get site name & status
     */
    async getAllowedSitesForManager(dto: GetAllowedSitesDto) {
        const { managerId } = dto;

        // 1️⃣ UserCityAccess se city_id nikalo
        const { data: accessData, error: accessError } =
            await this.supabaseService.client
                .from('UserCityAccess')
                .select('city_id')
                .eq('user_id', managerId);

        // ❌ Error case
        if (accessError) {
            return {
                status: 'fail',
                message: accessError.message || 'Failed to fetch city access',
                data: null,
            };
        }

        // ✅ No sites assigned
        if (!accessData || accessData.length === 0) {
            return {
                status: 'success',
                message: 'No sites assigned to this manager',
                data: [],
            };
        }

        const cityIds = accessData.map((item) => item.city_id);

        // 2️⃣ Cities table se city details lao
        const { data: cities, error: citiesError } =
            await this.supabaseService.client
                .from('Cities')
                .select('city_id, city_name, status')
                .in('city_id', cityIds);

        // ❌ Error case
        if (citiesError) {
            return {
                status: 'fail',
                message: citiesError.message || 'Failed to fetch cities',
                data: null,
            };
        }

        // 3️⃣ Final response format
        const formattedData = (cities || []).map((city) => ({
            siteId: city.city_id,
            siteName: city.city_name,
            status: city.status,
        }));

        // ✅ Success
        return {
            status: 'success',
            message: 'Allowed sites fetched successfully',
            data: formattedData,
        };
    }


    /**
     * Get employee details by employee code
     * Author: Ritik Parmar | 27 Jan 2026
     */
    async getEmployeeDetailsByCode(dto: GetEmployeeByCodeDto) {
        const { employeeCode } = dto;

        const { data, error } = await this.supabaseService.client
            .from('Employees')
            .select('employee_name, email')
            .eq('employee_code', employeeCode)
            .single();

        // ❌ Error OR employee not found
        if (error || !data) {
            return {
                status: 'fail',
                message: error?.message || 'Employee not found',
                data: null,
            };
        }

        // ✅ Success case
        return {
            status: 'success',
            message: 'Employee details fetched successfully',
            data: {
                employeeCode: employeeCode,
                name: data.employee_name,
                email: data.email,
            },
        };
    }

    /**
     * Save Field Executive App access details
     * Author: Ritik Parmar | 27 Jan 2026
     */
    /**
    * Save FE App access & send credentials email
    * Author: Ritik Parmar | 27 Jan 2026
    */
    async saveFEAppAccess(dto: SaveFEAppAccessDto) {
        const {
            employeeCode,
            userName,
            password,
            name,
            email,
            mailTemplate,
            createdBy,
        } = dto;
        const created_at = formatDateTime(new Date());
        // 1️⃣ Save FE access in DB (✅ column names fixed)
        const { data, error } = await this.supabaseService.client
            .from('FEUsers')
            .insert({
                employee_code: employeeCode,
                user_name: userName,
                password: password,
                created_by: createdBy,
                created_at,
                last_login_time: null,
                // status will auto be 'ACTIVE'
            })
            .select()
            .single();

        if (error) {
            return {
                status: 'fail',
                message: error.message || 'Failed to save FE app access',
                data: null,
            };
        }

        // 2️⃣ Prepare mail DTO
        const mailPayload: SendFEAppAccessMailDto = {
            to: email,
            subject: 'Field Executive App Login Credentials',
            template: mailTemplate,
            data: {
                name,
                userName,
                password,
            },
        };

        // 3️⃣ Send mail
        await this.mailApiService.sendFEAppAccessMail(mailPayload);

        // 4️⃣ Final response
        return {
            status: 'success',
            message: 'FE app access created and email sent successfully',
            data,
        };
    }

    /**
   * Get Field Executive users list with name & email
   * Author: Ritik Parmar | 27 Jan 2026
   */
    async getFEUsersList() {
        // 1️⃣ Get FE access records
        const { data: feUsers, error: feError } =
            await this.supabaseService.client
                .from('FEUsers')
                .select(`
        employee_code,
        last_login_time,
        status
      `)
                .order('created_at', { ascending: false });

        if (feError) {
            return {
                status: 'fail',
                message: feError.message || 'Failed to fetch FE users',
                data: null,
            };
        }

        if (!feUsers || feUsers.length === 0) {
            return {
                status: 'success',
                message: 'No Field Executive users found',
                data: [],
            };
        }

        // 2️⃣ Employee codes extract karo
        const employeeCodes = feUsers.map((u) => u.employee_code);

        // 3️⃣ Employees table se name + email lao
        const { data: employees, error: empError } =
            await this.supabaseService.client
                .from('Employees')
                .select('employee_code, employee_name, email')
                .in('employee_code', employeeCodes);

        if (empError) {
            return {
                status: 'fail',
                message: empError.message || 'Failed to fetch employee details',
                data: null,
            };
        }

        // 4️⃣ Map FE users + Employee details
        const finalData = feUsers.map((fe) => {
            const emp = employees?.find(
                (e) => e.employee_code === fe.employee_code,
            );

            return {
                employeeCode: fe.employee_code,
                employeeName: emp?.employee_name ?? '-',
                email: emp?.email ?? '-',
                assignedSite: '-', // 🔹 will come later
                lastLogin: fe.last_login_time,
                status: fe.status,
            };
        });

        return {
            status: 'success',
            message: 'Field Executive users list fetched successfully',
            data: finalData,
        };
    }

    /**
     * Activate / Deactivate Field Executive
     * Author: Ritik Parmar | 27 Jan 2026
     */
    async changeFEStatus(dto: ChangeFEStatusDto) {
        const { employeeCode, status } = dto;

        const { data, error } = await this.supabaseService.client
            .from('FEUsers')
            .update({ status })
            .eq('employee_code', employeeCode)
            .select()
            .single();

        if (error) {
            return {
                status: 'fail',
                message: error.message || 'Failed to update FE status',
                data: null,
            };
        }

        if (!data) {
            return {
                status: 'fail',
                message: 'Field Executive not found',
                data: null,
            };
        }

        return {
            status: 'success',
            message: `Field Executive ${status === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`,
            data: {
                employeeCode,
                status,
            },
        };
    }
    /**
     * Assign or Update Site for Field Executive
     * Author: Ritik Parmar | 27 Jan 2026
     *
     * Rules:
     * - FE already exists (comes from FE list)
     * - FE must be ACTIVE
     * - One FE → One Site
     * - First time → INSERT
     * - Re-assign → UPDATE
     */
    async assignOrUpdateSite(dto: AssignSiteDto) {
        const { employeeCode, cityId, assignedBy } = dto;

        // 1️⃣ Check FE status (existence assumed)
        const assigned_at = formatDateTime(new Date());
        const { data: feUser } = await this.supabaseService.client
            .from('FEUsers')
            .select('status')
            .eq('employee_code', employeeCode)
            .single();

        if (feUser?.status !== 'ACTIVE') {
            return {
                status: 'fail',
                message: 'Inactive Field Executive cannot be assigned a site',
                data: null,
            };
        }

        // 2️⃣ Check existing site assignment
        const { data: existingAssignment } =
            await this.supabaseService.client
                .from('FESiteAssignment')
                .select('id')
                .eq('employee_code', employeeCode)
                .maybeSingle();

        let result;

        // 3️⃣ Insert or Update
        if (!existingAssignment) {
            // First-time assignment
            const { error } = await this.supabaseService.client
                .from('FESiteAssignment')
                .insert({
                    employee_code: employeeCode,
                    city_id: cityId,
                    assigned_by: assignedBy,
                    assigned_at,
                    updated_at: formatDateTime(new Date()),
                });

            if (error) {
                return {
                    status: 'fail',
                    message: error.message || 'Failed to assign site',
                    data: null,
                };
            }

            result = {
                action: 'ASSIGNED',
                employeeCode,
                cityId,
            };
        } else {
            // Re-assign site
            const { error } = await this.supabaseService.client
                .from('FESiteAssignment')
                .update({
                    city_id: cityId,
                    updated_at: formatDateTime(new Date()),
                })
                .eq('employee_code', employeeCode);

            if (error) {
                return {
                    status: 'fail',
                    message: error.message || 'Failed to update site',
                    data: null,
                };
            }

            result = {
                action: 'UPDATED',
                employeeCode,
                cityId,
            };
        }

        // 4️⃣ Final response
        return {
            status: 'success',
            message:
                result.action === 'ASSIGNED'
                    ? 'Site assigned successfully'
                    : 'Site updated successfully',
            data: result,
        };
    }

}
