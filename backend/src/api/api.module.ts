import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { EmployeeModule } from "./employee/employee.module";
import { FilesModule } from "./files/file.module";
import { OrganizationModule } from "./organization/organization.module";
import { RolesModule } from "./roles/roles.module";
import { TimeManagementModule } from "./time-management/time-management.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    FilesModule,
    RolesModule,
    OrganizationModule,
    EmployeeModule,
    TimeManagementModule,
  ],
})
export class ApiModule {}
