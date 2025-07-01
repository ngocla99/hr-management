import { UserModule } from "@/api/user/user.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DepartmentSchemaFactory } from "./entities/department.entity";
import { TeamSchemaFactory } from "./entities/team.entity";
import { OrganizationController } from "./organization.controller";
import { OrganizationRepository } from "./organization.repository";
import { OrganizationService } from "./organization.service";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: "Department", schema: DepartmentSchemaFactory() },
      { name: "Team", schema: TeamSchemaFactory() },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, OrganizationRepository],
  exports: [OrganizationService, OrganizationRepository],
})
export class OrganizationModule {}
