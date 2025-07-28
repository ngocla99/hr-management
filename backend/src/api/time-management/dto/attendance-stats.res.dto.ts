import { NumberField } from "@/decorators/field.decorators";

export class AttendanceStatsDto {
  @NumberField({
    description: "Total number of days",
    example: 150,
  })
  totalDays: number;

  @NumberField({
    description: "Total number of late days",
    example: 25,
  })
  lateDays: number;

  @NumberField({
    description: "Total number of early leave days",
    example: 5,
  })
  earlyLeaveDays: number;

  @NumberField({
    description: "Total number of no clock out days",
    example: 10,
  })
  noClockOutDays: number;

  @NumberField({
    description: "Total number of total work hours",
    example: 190,
  })
  totalWorkHours: number;
}
