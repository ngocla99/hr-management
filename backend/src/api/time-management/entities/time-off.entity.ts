import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TimeOffDocument = HydratedDocument<TimeOff>;

export enum TimeOffType {
  ANNUAL_LEAVE = "annual_leave",
  SICK_LEAVE = "sick_leave",
  PERSONAL_LEAVE = "personal_leave",
  MATERNITY_LEAVE = "maternity_leave",
  PATERNITY_LEAVE = "paternity_leave",
  BEREAVEMENT_LEAVE = "bereavement_leave",
  UNPAID_LEAVE = "unpaid_leave",
  OTHER = "other",
}

export enum TimeOffStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

@Schema({
  timestamps: true,
})
export class TimeOff extends BaseEntity {
  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true, type: Date })
  endDate: Date;

  @Prop({
    type: String,
    enum: TimeOffType,
    required: true,
  })
  type: TimeOffType;

  @Prop({
    type: String,
    enum: TimeOffStatus,
    default: TimeOffStatus.PENDING,
  })
  status: TimeOffStatus;

  @Prop({ required: true, type: String })
  reason: string;

  @Prop({ type: Number, min: 0 })
  totalDays: number;

  @Prop({ type: Number, min: 0 })
  totalHours: number;

  @Prop({ type: Types.ObjectId, ref: "User" })
  approvedBy?: Types.ObjectId;

  @Prop({ type: Date })
  approvedAt?: Date;

  @Prop({ type: String })
  rejectionReason?: string;

  @Prop({ type: Types.ObjectId, ref: "File" })
  attachment?: Types.ObjectId;

  @Prop({ type: String })
  notes?: string;

  @Prop({ type: Boolean, default: false })
  isHalfDay: boolean;

  @Prop({ type: String })
  halfDayType?: "morning" | "afternoon";
}

export const TimeOffSchema = SchemaFactory.createForClass(TimeOff);

export const TimeOffSchemaFactory = () => {
  const timeOffSchema = TimeOffSchema;

  // Indexes for efficient querying
  timeOffSchema.index({ userId: 1, startDate: 1 });
  timeOffSchema.index({ status: 1 });
  timeOffSchema.index({ type: 1 });
  timeOffSchema.index({ startDate: 1, endDate: 1 });

  // Virtual for calculating duration
  timeOffSchema.virtual("duration").get(function () {
    if (!this.startDate || !this.endDate) return 0;
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  });

  // Ensure virtuals are included in JSON output
  timeOffSchema.set("toJSON", { virtuals: true });
  timeOffSchema.set("toObject", { virtuals: true });

  return timeOffSchema;
};
