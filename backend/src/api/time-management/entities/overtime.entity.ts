import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type OvertimeDocument = HydratedDocument<Overtime>;

export enum OvertimeStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum OvertimeType {
  REGULAR = "regular",
  HOLIDAY = "holiday",
  WEEKEND = "weekend",
  NIGHT_SHIFT = "night_shift",
  SPECIAL = "special",
}

@Schema({
  timestamps: true,
})
export class Overtime extends BaseEntity {
  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Date })
  requestDate: Date;

  @Prop({ required: true, type: Date })
  overtimeDate: Date;

  @Prop({ required: true, type: Date })
  startTime: Date;

  @Prop({ required: true, type: Date })
  endTime: Date;

  @Prop({
    type: String,
    enum: OvertimeStatus,
    default: OvertimeStatus.PENDING,
  })
  status: OvertimeStatus;

  @Prop({
    type: String,
    enum: OvertimeType,
    default: OvertimeType.REGULAR,
  })
  type: OvertimeType;

  @Prop({ required: true, type: String })
  reason: string;

  @Prop({ type: Number, min: 0 })
  totalHours: number;

  @Prop({ type: Number, min: 0 })
  hourlyRate?: number;

  @Prop({ type: Number, min: 0 })
  totalAmount?: number;

  @Prop({ type: Types.ObjectId, ref: "User" })
  approvedBy?: Types.ObjectId;

  @Prop({ type: Date })
  approvedAt?: Date;

  @Prop({ type: String })
  rejectionReason?: string;

  @Prop({ type: String })
  notes?: string;
}

export const OvertimeSchema = SchemaFactory.createForClass(Overtime);

export const OvertimeSchemaFactory = () => {
  const overtimeSchema = OvertimeSchema;

  // Indexes for efficient querying
  overtimeSchema.index({ userId: 1, overtimeDate: 1 });
  overtimeSchema.index({ status: 1 });
  overtimeSchema.index({ type: 1 });
  overtimeSchema.index({ overtimeDate: 1 });

  // Virtual for calculating total amount
  overtimeSchema.virtual("calculatedAmount").get(function () {
    if (!this.totalHours || !this.hourlyRate) return 0;
    return this.totalHours * this.hourlyRate;
  });

  // Ensure virtuals are included in JSON output
  overtimeSchema.set("toJSON", { virtuals: true });
  overtimeSchema.set("toObject", { virtuals: true });

  return overtimeSchema;
};
