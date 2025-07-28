import {
  BooleanField,
  DateField,
  NumberField,
  StringField,
  UUIDField,
} from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";
import { AttendanceStatus } from "../entities/attendance.entity";

@Exclude()
export class AttendanceResDto {
  @UUIDField({
    description: "Attendance ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  id: string;

  @UUIDField({
    description: "User ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  userId: string;

  @DateField({
    description: "Attendance date",
    example: "2024-01-15T00:00:00.000Z",
  })
  @Expose()
  date: Date;

  @DateField({
    description: "Clock in time",
    example: "2024-01-15T09:00:00.000Z",
  })
  @Expose()
  clockInTime: Date;

  @DateField({
    description: "Clock out time",
    example: "2024-01-15T18:00:00.000Z",
    nullable: true,
  })
  @Expose()
  clockOutTime?: Date;

  @DateField({
    description: "Break start time (computed)",
    example: "2024-01-15T12:00:00.000Z",
    nullable: true,
  })
  @Expose()
  breakStartTime?: Date;

  @DateField({
    description: "Break end time (computed)",
    example: "2024-01-15T13:00:00.000Z",
    nullable: true,
  })
  @Expose()
  breakEndTime?: Date;

  @DateField({
    description: "Overtime start time",
    example: "2024-01-15T18:00:00.000Z",
    nullable: true,
  })
  @Expose()
  overtimeStartTime?: Date;

  @DateField({
    description: "Overtime end time",
    example: "2024-01-15T20:00:00.000Z",
    nullable: true,
  })
  @Expose()
  overtimeEndTime?: Date;

  @StringField({
    description: "Attendance status",
    example: AttendanceStatus.PRESENT,
  })
  @Expose()
  status: AttendanceStatus;

  @NumberField({
    description: "Total work hours",
    example: 8.5,
    nullable: true,
  })
  @Expose()
  totalWorkHours?: number;

  @NumberField({
    description: "Net work hours (excluding break)",
    example: 7.5,
    nullable: true,
  })
  @Expose()
  netWorkHours?: number;

  @NumberField({
    description: "Total break hours (default: 1.0)",
    example: 1.0,
  })
  @Expose()
  totalBreakHours: number;

  @NumberField({
    description: "Total overtime hours",
    example: 2.0,
    nullable: true,
  })
  @Expose()
  totalOvertimeHours?: number;

  @StringField({
    description: "Notes",
    example: "Working from office",
    nullable: true,
  })
  @Expose()
  notes?: string;

  @BooleanField({
    description: "Is late",
    example: false,
  })
  @Expose()
  isLate: boolean;

  @BooleanField({
    description: "Is early leave",
    example: false,
  })
  @Expose()
  isEarlyLeave: boolean;

  @BooleanField({
    description: "Is no clock out",
    example: false,
  })
  @Expose()
  isNoClockOut: boolean;
}
