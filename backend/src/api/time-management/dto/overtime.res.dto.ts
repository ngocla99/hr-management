import {
  BooleanField,
  DateField,
  NumberField,
  StringField,
  UUIDField,
} from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";
import { OvertimeStatus, OvertimeType } from "../entities/overtime.entity";

@Exclude()
export class OvertimeResDto {
  @UUIDField({
    description: "Overtime ID",
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
    description: "Request date",
    example: "2024-01-15T00:00:00.000Z",
  })
  @Expose()
  requestDate: Date;

  @DateField({
    description: "Overtime date",
    example: "2024-01-16T00:00:00.000Z",
  })
  @Expose()
  overtimeDate: Date;

  @DateField({
    description: "Start time",
    example: "2024-01-16T18:00:00.000Z",
  })
  @Expose()
  startTime: Date;

  @DateField({
    description: "End time",
    example: "2024-01-16T22:00:00.000Z",
  })
  @Expose()
  endTime: Date;

  @StringField({
    description: "Overtime status",
    example: OvertimeStatus.PENDING,
  })
  @Expose()
  status: OvertimeStatus;

  @StringField({
    description: "Overtime type",
    example: OvertimeType.REGULAR,
  })
  @Expose()
  type: OvertimeType;

  @StringField({
    description: "Reason for overtime",
    example: "Project deadline",
  })
  @Expose()
  reason: string;

  @NumberField({
    description: "Total hours",
    example: 4,
  })
  @Expose()
  totalHours: number;

  @NumberField({
    description: "Hourly rate",
    example: 25.0,
    nullable: true,
  })
  @Expose()
  hourlyRate?: number;

  @NumberField({
    description: "Total amount",
    example: 100.0,
    nullable: true,
  })
  @Expose()
  totalAmount?: number;

  @UUIDField({
    description: "Approved by user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
    nullable: true,
  })
  @Expose()
  approvedBy?: string;

  @DateField({
    description: "Approved at",
    example: "2024-01-15T10:00:00.000Z",
    nullable: true,
  })
  @Expose()
  approvedAt?: Date;

  @StringField({
    description: "Rejection reason",
    example: "Insufficient budget",
    nullable: true,
  })
  @Expose()
  rejectionReason?: string;

  @StringField({
    description: "Notes",
    example: "Approved by manager",
    nullable: true,
  })
  @Expose()
  notes?: string;

  @BooleanField({
    description: "Is paid",
    example: false,
  })
  @Expose()
  isPaid: boolean;

  @DateField({
    description: "Paid at",
    example: "2024-01-20T00:00:00.000Z",
    nullable: true,
  })
  @Expose()
  paidAt?: Date;
}
