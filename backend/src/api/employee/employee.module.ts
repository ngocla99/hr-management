import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository } from "./employee.repository";
import { EmployeeService } from "./employee.service";
import { Employee, EmployeeSchemaFactory } from "./entities/employee.entity";
import { EmployeeNumberUtil } from "./utils/employee-number.util";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchemaFactory() }]),
    forwardRef(() => UserModule),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository, EmployeeNumberUtil],
  exports: [EmployeeService, EmployeeRepository, EmployeeNumberUtil],
})
export class EmployeeModule {}
