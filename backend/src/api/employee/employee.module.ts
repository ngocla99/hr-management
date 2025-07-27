import { UserModule } from "@/api/user/user.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository } from "./employee.repository";
import { EmployeeService } from "./employee.service";
import { Employee, EmployeeSchemaFactory } from "./entities/employee.entity";
import { EmployeeNumberUtil } from "./utils/employee-number.util";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchemaFactory() }]),
    UserModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository, EmployeeNumberUtil],
  exports: [EmployeeService, EmployeeRepository, EmployeeNumberUtil],
})
export class EmployeeModule {}
