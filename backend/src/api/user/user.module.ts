import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeModule } from "../employee/employee.module";
import { UserSchemaFactory } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchemaFactory() }]),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
