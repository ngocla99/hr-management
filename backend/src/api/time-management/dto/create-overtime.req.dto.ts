import {
  DateField,
  EnumField,
  NumberField,
  StringField,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { OvertimeType } from "../entities/overtime.entity";

export class CreateOvertimeReqDto {
  @DateField({
    description: "Overtime date",
    example: "2024-01-15T00:00:00.000Z",
  })
  overtimeDate: Date;

  @DateField({
    description: "Start time",
    example: "2024-01-15T18:00:00.000Z",
  })
  startTime: Date;

  @DateField({
    description: "End time",
    example: "2024-01-15T20:00:00.000Z",
  })
  endTime: Date;

  @EnumField(() => OvertimeType, {
    description: "Overtime type",
    example: OvertimeType.REGULAR,
  })
  type: OvertimeType;

  @StringField({
    description: "Reason for overtime",
    example: "Project deadline",
  })
  reason: string;

  @NumberField({
    description: "Total hours",
    example: 2,
    nullable: true,
  })
  totalHours?: number;

  @NumberField({
    description: "Hourly rate",
    example: 25.0,
    nullable: true,
  })
  hourlyRate?: number;

  @StringFieldOptional({
    description: "Notes",
    example: "Working on urgent project",
  })
  notes?: string;
}
