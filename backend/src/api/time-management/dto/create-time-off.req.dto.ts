import {
  DateField,
  EnumField,
  NumberField,
  StringField,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { TimeOffType } from "../entities/time-off.entity";

export class CreateTimeOffReqDto {
  @StringField({
    description: "User ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  userId: string;

  @DateField({
    description: "Start date",
    example: "2024-01-15T00:00:00.000Z",
  })
  startDate: Date;

  @DateField({
    description: "End date",
    example: "2024-01-17T00:00:00.000Z",
  })
  endDate: Date;

  @EnumField(() => TimeOffType, {
    description: "Time off type",
    example: TimeOffType.ANNUAL_LEAVE,
  })
  type: TimeOffType;

  @StringField({
    description: "Reason for time off",
    example: "Family vacation",
  })
  reason: string;

  @NumberField({
    description: "Total days",
    example: 3,
    nullable: true,
  })
  totalDays?: number;

  @NumberField({
    description: "Total hours",
    example: 24,
    nullable: true,
  })
  totalHours?: number;

  @StringFieldOptional({
    description: "Notes",
    example: "Will be available for urgent matters",
  })
  notes?: string;

  @StringFieldOptional({
    description: "Attachment file ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  attachment?: string;

  @StringFieldOptional({
    description: "Half day type",
    example: "morning",
  })
  halfDayType?: "morning" | "afternoon";
}
