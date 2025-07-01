import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { FilesModule } from "./files/file.module";
import { OrganizationModule } from "./organization/organization.module";
import { RolesModule } from "./roles/roles.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule, AuthModule, FilesModule, RolesModule, OrganizationModule],
})
export class ApiModule {}
