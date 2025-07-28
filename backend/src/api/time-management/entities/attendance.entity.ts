import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { differenceInHours } from "date-fns";
import { HydratedDocument, Types } from "mongoose";

export type AttendanceDocument = HydratedDocument<Attendance>;

export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  LATE = "late",
  HALF_DAY = "half_day",
  DAY_OFF = "day_off",
  SICK_LEAVE = "sick_leave",
  VACATION = "vacation",
}

export enum AttendanceType {
  CLOCK_IN = "clock_in",
  CLOCK_OUT = "clock_out",
  BREAK_START = "break_start",
  BREAK_END = "break_end",
  OVERTIME_START = "overtime_start",
  OVERTIME_END = "overtime_end",
}

@Schema({
  timestamps: true,
})
export class Attendance extends BaseEntity {
  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: Date })
  clockInTime: Date;

  @Prop({ type: Date })
  clockOutTime?: Date;

  @Prop({ type: Date })
  overtimeStartTime?: Date;

  @Prop({ type: Date })
  overtimeEndTime?: Date;

  @Prop({
    type: String,
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
  })
  status: AttendanceStatus;

  @Prop({ type: Number, min: 0 })
  totalWorkHours?: number;

  @Prop({ type: Number, min: 0, default: 1.0 })
  totalBreakHours: number;

  @Prop({ type: Number, min: 0 })
  totalOvertimeHours?: number;

  @Prop({ type: String })
  notes?: string;

  @Prop({ type: Boolean, default: false })
  isLate: boolean;

  @Prop({ type: Boolean, default: false })
  isEarlyLeave: boolean;

  @Prop({ type: Boolean, default: false })
  isNoClockOut: boolean;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);

export const AttendanceSchemaFactory = () => {
  const attendanceSchema = AttendanceSchema;

  // Indexes for efficient querying
  attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });
  attendanceSchema.index({ date: 1 });
  attendanceSchema.index({ status: 1 });

  // Virtual for calculating work duration using date-fns
  attendanceSchema.virtual("workDuration").get(function () {
    if (!this.clockInTime || !this.clockOutTime) return 0;
    return differenceInHours(this.clockOutTime, this.clockInTime);
  });

  // Virtual for calculating net work hours (excluding break) using date-fns
  attendanceSchema.virtual("netWorkHours").get(function () {
    if (!this.clockInTime || !this.clockOutTime) return 0;
    const totalHours = differenceInHours(this.clockOutTime, this.clockInTime);
    return Math.max(0, totalHours - this.totalBreakHours);
  });

  // Virtual for calculating overtime duration using date-fns
  attendanceSchema.virtual("overtimeDuration").get(function () {
    if (!this.overtimeStartTime || !this.overtimeEndTime) return 0;
    return differenceInHours(this.overtimeEndTime, this.overtimeStartTime);
  });

  // Virtual for break start time (computed based on clock in time)
  attendanceSchema.virtual("breakStartTime").get(function () {
    if (!this.clockInTime) return null;
    const breakStart = new Date(this.clockInTime);
    breakStart.setHours(12, 0, 0, 0); // 12:00 PM
    return breakStart;
  });

  // Virtual for break end time (computed based on clock in time)
  attendanceSchema.virtual("breakEndTime").get(function () {
    if (!this.clockInTime) return null;
    const breakEnd = new Date(this.clockInTime);
    breakEnd.setHours(13, 0, 0, 0); // 1:00 PM
    return breakEnd;
  });

  // Ensure virtuals are included in JSON output
  attendanceSchema.set("toJSON", { virtuals: true });
  attendanceSchema.set("toObject", { virtuals: true });

  return attendanceSchema;
};
