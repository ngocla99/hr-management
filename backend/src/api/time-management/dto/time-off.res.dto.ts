import {
  BooleanField,
  DateField,
  NumberField,
  StringField,
  UUIDField,
} from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";
import { TimeOffStatus, TimeOffType } from "../entities/time-off.entity";

@Exclude()
export class TimeOffResDto {
  @UUIDField({
    description: "Time off ID",
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
    description: "Start date",
    example: "2024-01-15T00:00:00.000Z",
  })
  @Expose()
  startDate: Date;

  @DateField({
    description: "End date",
    example: "2024-01-20T00:00:00.000Z",
  })
  @Expose()
  endDate: Date;

  @StringField({
    description: "Time off type",
    example: TimeOffType.ANNUAL_LEAVE,
  })
  @Expose()
  type: TimeOffType;

  @StringField({
    description: "Time off status",
    example: TimeOffStatus.PENDING,
  })
  @Expose()
  status: TimeOffStatus;

  @StringField({
    description: "Reason for time off",
    example: "Annual vacation",
  })
  @Expose()
  reason: string;

  @NumberField({
    description: "Total days",
    example: 5,
  })
  @Expose()
  totalDays: number;

  @NumberField({
    description: "Total hours",
    example: 40,
  })
  @Expose()
  totalHours: number;

  @UUIDField({
    description: "Approved by user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
    nullable: true,
  })
  @Expose()
  approvedBy?: string;

  @DateField({
    description: "Approved at",
    example: "2024-01-10T10:00:00.000Z",
    nullable: true,
  })
  @Expose()
  approvedAt?: Date;

  @StringField({
    description: "Rejection reason",
    example: "Insufficient leave balance",
    nullable: true,
  })
  @Expose()
  rejectionReason?: string;

  @StringField({
    description: "Attachment file ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
    nullable: true,
  })
  @Expose()
  attachment?: string;

  @StringField({
    description: "Notes",
    example: "Approved by manager",
    nullable: true,
  })
  @Expose()
  notes?: string;

  @BooleanField({
    description: "Is half day",
    example: false,
  })
  @Expose()
  isHalfDay: boolean;

  @StringField({
    description: "Half day type",
    example: "morning",
    nullable: true,
  })
  @Expose()
  halfDayType?: string;
}
