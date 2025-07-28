import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { endOfDay, startOfDay } from "date-fns";
import { Model, Types } from "mongoose";
import { AttendanceStatsDto } from "./dto/attendance-stats.res.dto";
import { Attendance, AttendanceDocument } from "./entities/attendance.entity";
import { Overtime, OvertimeDocument, OvertimeStatus } from "./entities/overtime.entity";
import { TimeOff, TimeOffDocument } from "./entities/time-off.entity";

@Injectable()
export class TimeManagementRepository {
  constructor(
    @InjectModel(Attendance.name) public readonly attendanceModel: Model<AttendanceDocument>,
    @InjectModel(TimeOff.name) public readonly timeOffModel: Model<TimeOffDocument>,
    @InjectModel(Overtime.name) public readonly overtimeModel: Model<OvertimeDocument>,
  ) {}

  // Attendance methods
  async findAttendanceByUserAndDate(
    userId: string,
    date: Date,
  ): Promise<AttendanceDocument | null> {
    const startDate = startOfDay(date);
    const endDate = endOfDay(date);

    return await this.attendanceModel
      .findOne({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }

  async createAttendance(attendanceData: Partial<Attendance>): Promise<AttendanceDocument> {
    const attendance = new this.attendanceModel(attendanceData);
    return await attendance.save();
  }

  async updateAttendance(
    id: string,
    updateData: Partial<Attendance>,
  ): Promise<AttendanceDocument | null> {
    return await this.attendanceModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async findAttendanceByUser(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AttendanceDocument[]> {
    return await this.attendanceModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      })
      .sort({ date: -1 })
      .exec();
  }

  async countAttendanceByUser(userId: string, startDate: Date, endDate: Date): Promise<number> {
    return await this.attendanceModel
      .countDocuments({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }

  // TimeOff methods
  async createTimeOff(timeOffData: Partial<TimeOff>): Promise<TimeOffDocument> {
    const timeOff = new this.timeOffModel(timeOffData);
    return await timeOff.save();
  }

  async findTimeOffById(id: string): Promise<TimeOffDocument | null> {
    return await this.timeOffModel
      .findById(id)
      .populate("userId", "firstName lastName email")
      .populate("approvedBy", "firstName lastName")
      .exec();
  }

  async findTimeOffByUser(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TimeOffDocument[]> {
    return await this.timeOffModel
      .find({
        userId: new Types.ObjectId(userId),
        $or: [
          { startDate: { $gte: startDate, $lte: endDate } },
          { endDate: { $gte: startDate, $lte: endDate } },
          { $and: [{ startDate: { $lte: startDate } }, { endDate: { $gte: endDate } }] },
        ],
      })
      .sort({ startDate: -1 })
      .exec();
  }

  async countTimeOffByUser(userId: string, startDate: Date, endDate: Date): Promise<number> {
    return await this.timeOffModel
      .countDocuments({
        userId: new Types.ObjectId(userId),
        $or: [
          { startDate: { $gte: startDate, $lte: endDate } },
          { endDate: { $gte: startDate, $lte: endDate } },
          { $and: [{ startDate: { $lte: startDate } }, { endDate: { $gte: endDate } }] },
        ],
      })
      .exec();
  }

  async updateTimeOffStatus(
    id: string,
    updateData: Record<string, any>,
  ): Promise<TimeOffDocument | null> {
    const updateObj = { ...updateData };
    if (updateData.approvedBy) {
      updateObj.approvedBy = new Types.ObjectId(updateData.approvedBy);
      updateObj.approvedAt = new Date();
    }

    return await this.timeOffModel.findByIdAndUpdate(id, updateObj, { new: true }).exec();
  }

  // Overtime methods
  async createOvertime(overtimeData: Partial<Overtime>): Promise<OvertimeDocument> {
    const overtime = new this.overtimeModel(overtimeData);
    return await overtime.save();
  }

  async findOvertimeById(id: string): Promise<OvertimeDocument | null> {
    return await this.overtimeModel
      .findById(id)
      .populate("userId", "firstName lastName email")
      .populate("approvedBy", "firstName lastName")
      .exec();
  }

  async findOvertimeByUser(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<OvertimeDocument[]> {
    return await this.overtimeModel
      .find({
        userId: new Types.ObjectId(userId),
        overtimeDate: { $gte: startDate, $lte: endDate },
      })
      .sort({ overtimeDate: -1 })
      .exec();
  }

  async updateOvertimeStatus(
    id: string,
    status: OvertimeStatus,
    approvedBy?: string,
  ): Promise<OvertimeDocument | null> {
    const updateData: Partial<Overtime> = { status };
    if (approvedBy) {
      updateData.approvedBy = new Types.ObjectId(approvedBy);
      updateData.approvedAt = new Date();
    }
    return await this.overtimeModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async getAttendanceStats(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AttendanceStatsDto> {
    const result = await this.attendanceModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalDays: { $sum: 1 },
          lateDays: { $sum: { $cond: ["$isLate", 1, 0] } },
          earlyLeaveDays: { $sum: { $cond: ["$isEarlyLeave", 1, 0] } },
          noClockOutDays: { $sum: { $cond: ["$isNoClockOut", 1, 0] } },
          totalWorkHours: { $sum: { $ifNull: ["$totalWorkHours", 0] } },
          totalOvertimeHours: { $sum: { $ifNull: ["$totalOvertimeHours", 0] } },
        },
      },
    ]);

    return (result[0] || {
      totalDays: 0,
      lateDays: 0,
      earlyLeaveDays: 0,
      noClockOutDays: 0,
      totalWorkHours: 0,
      totalOvertimeHours: 0,
    }) as AttendanceStatsDto;
  }
}
