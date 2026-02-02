import { Injectable, } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.service';
import { AssignSiteDto, ChangeFEStatusDto, FELoginDto, GetAllowedSitesDto, GetEmployeeByCodeDto, SaveFEAppAccessDto } from './dto/fe-users.dto';
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
                .from('Sites')
                .select('site_id, site_name, status')
                .in('site_id', cityIds);

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
            siteId: city.site_id,
            siteName: city.site_name,
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
                message: 'Employee not found',
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

        // 1️⃣ Sabse pehle check karo ki kya ye employee pehle se exist karta hai?
        const { data: existingUser, error: checkError } = await this.supabaseService.client
            .from('FEUsers')
            .select('employee_code')
            .eq('employee_code', employeeCode)
            .maybeSingle();

        if (checkError) {
            return {
                status: 'fail',
                message: 'Error checking creating FE app access',
                data: null,
            };
        }

        // Agar user mil gaya, toh duplicate create nahi hone denge
        if (existingUser) {
            return {
                status: 'fail',
                message: `Access already exists for Employee name: ${name}`,
                data: null,
            };
        }

        const created_at = formatDateTime(new Date());

        // 2️⃣ Naya access record save karo
        const { data, error } = await this.supabaseService.client
            .from('FEUsers')
            .insert({
                employee_code: employeeCode,
                user_name: userName,
                password: password,
                created_by: createdBy,
                created_at,
                last_login_time: null,
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

        // 3️⃣ Email bhejte waqt data prepare karo
        const mailPayload: SendFEAppAccessMailDto = {
            to: email,
            subject: 'Field Executive App Login Credentials',
            template: mailTemplate,
            data: { name, userName, password },
        };

        // 4️⃣ Mail Service ko call karo
        await this.mailApiService.sendFEAppAccessMail(mailPayload);

        // 5️⃣ Final response jisme frontend ke liye zaruri data ho
        return {
            status: 'success',
            message: 'FE app access created and email sent successfully',
            data: {
                ...data, // DB se aaya hua data
                employeeName: name, // Frontend table display ke liye
                email: email       // Frontend table display ke liye
            },
        };
    }
    /**
   * Get Field Executive users list with name & email
   * Author: Ritik Parmar | 27 Jan 2026
   */
    async getFEUsersList(managerId: string, allowedSites: number[]) {
        try {
            // 1️⃣ Sabhi FE Users fetch karo
            const { data: feUsers, error: feError } = await this.supabaseService.client
                .from('FEUsers')
                .select('employee_code, last_login_time, status, created_by')
                .order('created_at', { ascending: false });

            if (feError) throw feError;
            if (!feUsers || feUsers.length === 0) return { status: 'success', data: [] };

            const allEmployeeCodes = feUsers.map((u) => u.employee_code);

            // 2️⃣ Employees Basic Details
            const { data: employees } = await this.supabaseService.client
                .from('Employees')
                .select('employee_code, employee_name, email')
                .in('employee_code', allEmployeeCodes);

            // 3️⃣ Assignments fetch karo (All assignments for these users)
            const { data: assignments } = await this.supabaseService.client
                .from('FESiteAssignments')
                .select('employee_code, site_id')
                .in('employee_code', allEmployeeCodes);

            // 4️⃣ Sirf Manager ki Allowed Sites ke names fetch karo
            const { data: sites } = await this.supabaseService.client
                .from('Sites')
                .select('site_id, site_name')
                .in('site_id', allowedSites);

            // 5️⃣ The Dynamic Filter Logic
            const filteredData = feUsers.reduce((acc: any[], fe) => {
                const userAssign = assignments?.find((a) => String(a.employee_code) === String(fe.employee_code));
                const isCreatedByMe = String(fe.created_by) === String(managerId);

                let shouldInclude = false;

                if (userAssign) {
                    // ✅ CASE 1: User assigned hai
                    // Logic: Agar user ki site meri allowed list mein hai, toh mujhe dikhega 
                    // (Chahe banaya kisi ne bhi ho)
                    const isSiteAllowed = allowedSites.includes(Number(userAssign.site_id));
                    if (isSiteAllowed) {
                        shouldInclude = true;
                    }
                } else {
                    // ✅ CASE 2: User assigned nahi hai
                    // Logic: Tabhi dikhega agar maine create kiya hai
                    if (isCreatedByMe) {
                        shouldInclude = true;
                    }
                }

                if (shouldInclude) {
                    const emp = employees?.find((e) => e.employee_code === fe.employee_code);
                    const siteInfo = sites?.find((s) => s.site_id === userAssign?.site_id);

                    acc.push({
                        employeeCode: fe.employee_code,
                        employeeName: emp?.employee_name ?? '-',
                        email: emp?.email ?? '-',
                        assignedSite: siteInfo ? siteInfo.site_name : '-', // Assigned hai toh naam, warna '-'
                        lastLogin: fe.last_login_time,
                        status: fe.status,
                    });
                }
                return acc;
            }, []);

            return {
                status: 'success',
                message: 'Dynamic FE users list fetched successfully',
                data: filteredData,
            };

        } catch (err) {
            console.log('❌ Error in getFEUsersList:', err.message);
            return { status: 'fail', message: err.message, data: null };
        }
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
        const { employeeCode, siteId, assignedBy } = dto; // cityId variable stays same from DTO

        const assigned_at = formatDateTime(new Date());

        // 1️⃣ Check FE status
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
        const { data: existingAssignment } = await this.supabaseService.client
            .from('FESiteAssignments')
            .select('id')
            .eq('employee_code', employeeCode)
            .maybeSingle();

        let result;

        // 3️⃣ Insert or Update using site_id
        if (!existingAssignment) {
            const { error } = await this.supabaseService.client
                .from('FESiteAssignments')
                .insert({
                    employee_code: employeeCode,
                    site_id: siteId, // 👈 Updated to site_id
                    assigned_by: assignedBy,
                    assigned_at,
                    updated_at: formatDateTime(new Date()),
                });

            if (error) return { status: 'fail', message: error.message, data: null };
            result = { action: 'ASSIGNED', employeeCode, site_id: siteId };
        } else {
            const { error } = await this.supabaseService.client
                .from('FESiteAssignments')
                .update({
                    site_id: siteId, // 👈 Updated to site_id
                    updated_at: formatDateTime(new Date()),
                })
                .eq('employee_code', employeeCode);

            if (error) return { status: 'fail', message: error.message, data: null };
            result = { action: 'UPDATED', employeeCode, site_id: siteId };
        }

        return {
            status: 'success',
            message: result.action === 'ASSIGNED' ? 'Site assigned successfully' : 'Site updated successfully',
            data: result,
        };
    }
    /**
     * Field Executive App Login
     * Optimized & App-friendly messages
     */
    async feLogin(dto: FELoginDto) {
        const { userName, password } = dto;

        // 1️⃣ User Auth logic... (Same as before)
        const { data: user } = await this.supabaseService.client
            .from('FEUsers')
            .select('employee_code, user_name, status, password')
            .eq('user_name', userName)
            .maybeSingle();

        if (!user || user.password !== password) {
            return { status: 'fail', message: 'Incorrect username or password', data: null };
        }

        // 2️⃣ Employee Name fetch karein
        const { data: employee } = await this.supabaseService.client
            .from('Employees')
            .select('employee_name')
            .eq('employee_code', user.employee_code)
            .maybeSingle();

        // 4️⃣ Check site assignment (Step-by-step to avoid Null)
        // Pehle sirf assignment table se site_id nikalein
        const { data: assignment } = await this.supabaseService.client
            .from('FESiteAssignments')
            .select('site_id')
            .eq('employee_code', user.employee_code)
            .maybeSingle();

        let siteDetails: any = null;

        if (assignment) {
            // Agar ID mili, toh Sites table se uska naam uthayein
            const { data: siteData } = await this.supabaseService.client
                .from('Sites')
                .select('site_name')
                .eq('site_id', assignment.site_id)
                .maybeSingle();

            siteDetails = {
                siteId: assignment.site_id,
                siteName: siteData?.site_name || 'Site Name Not Found'
            };
        }
        console.log(siteDetails)

        // 5️⃣ Update last login time...
        await this.supabaseService.client
            .from('FEUsers')
            .update({ last_login_time: new Date().toISOString() })
            .eq('employee_code', user.employee_code);

        // 6️⃣ Final response
        return {
            status: 'success',
            message: siteDetails ? 'Login successful' : 'Login successful. Site not assigned yet.',
            data: {
                employeeCode: user.employee_code,
                employeeName: employee?.employee_name || 'Executive',
                siteAssigned: !!siteDetails,
                site: siteDetails,
            },
        };
    }


}
