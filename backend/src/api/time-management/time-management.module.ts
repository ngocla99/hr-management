import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeModule } from "../employee/employee.module";
import { Attendance, AttendanceSchemaFactory } from "./entities/attendance.entity";
import { Overtime, OvertimeSchemaFactory } from "./entities/overtime.entity";
import { TimeOff, TimeOffSchemaFactory } from "./entities/time-off.entity";
import { TimeManagementController } from "./time-management.controller";
import { TimeManagementRepository } from "./time-management.repository";
import { TimeManagementService } from "./time-management.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchemaFactory() },
      { name: TimeOff.name, schema: TimeOffSchemaFactory() },
      { name: Overtime.name, schema: OvertimeSchemaFactory() },
    ]),
    EmployeeModule,
  ],
  controllers: [TimeManagementController],
  providers: [TimeManagementService, TimeManagementRepository],
  exports: [TimeManagementService, TimeManagementRepository],
})
export class TimeManagementModule {}
