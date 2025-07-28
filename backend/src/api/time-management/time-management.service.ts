import { EmployeeService } from "@/api/employee/employee.service";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { ErrorCode } from "@/constants/error-code.constant";
import { ValidationException } from "@/exceptions/validation.exception";
import { paginate } from "@/utils/offset-pagination";
import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import {
  differenceInDays,
  differenceInHours,
  isAfter,
  isBefore,
  isSameDay,
  startOfDay,
} from "date-fns";
import { Types } from "mongoose";
import { AttendanceStatsDto } from "./dto/attendance-stats.res.dto";
import { AttendanceResDto } from "./dto/attendance.res.dto";
import { ClockInReqDto } from "./dto/clock-in.req.dto";
import { ClockOutReqDto } from "./dto/clock-out.req.dto";
import { CreateOvertimeReqDto } from "./dto/create-overtime.req.dto";
import { CreateTimeOffReqDto } from "./dto/create-time-off.req.dto";
import { ListHistoryReqDto } from "./dto/list-history.req.dto";
import { OvertimeResDto } from "./dto/overtime.res.dto";
import { TimeOffResDto } from "./dto/time-off.res.dto";
import { Attendance, AttendanceDocument, AttendanceStatus } from "./entities/attendance.entity";
import { Overtime, OvertimeStatus } from "./entities/overtime.entity";
import { TimeOff, TimeOffDocument, TimeOffStatus } from "./entities/time-off.entity";
import { TimeManagementRepository } from "./time-management.repository";

@Injectable()
export class TimeManagementService {
  constructor(
    private readonly timeManagementRepository: TimeManagementRepository,
    private readonly employeeService: EmployeeService,
  ) {}

  // Attendance methods
  async clockIn(userId: string, clockInData: ClockInReqDto): Promise<AttendanceResDto> {
    const today = startOfDay(new Date());

    const existingAttendance = await this.timeManagementRepository.findAttendanceByUserAndDate(
      userId,
      today,
    );

    if (existingAttendance) {
      throw new ValidationException(ErrorCode.TM001);
    }

    const clockInTime = new Date();
    const isLate = this.isLate(clockInTime);

    const attendanceData: Partial<Attendance> = {
      userId: new Types.ObjectId(userId),
      date: today,
      clockInTime,
      status: AttendanceStatus.PRESENT,
      isLate,
      totalBreakHours: 1.0, // Default 1 hour break
      notes: clockInData.notes,
    };

    const attendance = await this.timeManagementRepository.createAttendance(attendanceData);

    await this.employeeService.updateByUserId(userId, { lastClockedIn: clockInTime });

    return plainToInstance(AttendanceResDto, attendance);
  }

  async clockOut(userId: string, clockOutData: ClockOutReqDto): Promise<AttendanceResDto> {
    const today = startOfDay(new Date());

    const attendance = await this.timeManagementRepository.findAttendanceByUserAndDate(
      userId,
      today,
    );

    if (!attendance) {
      throw new ValidationException(ErrorCode.TM005);
    }

    if (attendance.clockOutTime) {
      throw new ValidationException(ErrorCode.TM002);
    }

    const clockOutTime = new Date();
    const isEarlyLeave = this.isEarlyLeave(clockOutTime);

    const workHours = differenceInHours(clockOutTime, attendance.clockInTime);

    const updateData: Partial<Attendance> = {
      clockOutTime,
      isEarlyLeave,
      totalWorkHours: workHours,
      notes: clockOutData.notes,
    };

    const updatedAttendance = await this.timeManagementRepository.updateAttendance(
      attendance.id,
      updateData,
    );

    return plainToInstance(AttendanceResDto, updatedAttendance);
  }

  async getAttendanceHistory(
    userId: string,
    reqDto: ListHistoryReqDto,
  ): Promise<OffsetPaginatedDto<AttendanceResDto>> {
    const { startDate, endDate } = reqDto;

    if (!userId || !startDate || !endDate) {
      throw new ValidationException(ErrorCode.V000);
    }

    const filter = {
      userId: new Types.ObjectId(userId),
      date: { $gte: startDate, $lte: endDate },
    };

    const [attendances, metaDto] = await paginate<AttendanceDocument>(
      this.timeManagementRepository.attendanceModel,
      reqDto,
      {
        skipCount: false,
        takeAll: false,
        filter,
      },
    );

    return new OffsetPaginatedDto(plainToInstance(AttendanceResDto, attendances), metaDto);
  }

  async getAttendanceStats(userId: string, reqDto: ListHistoryReqDto): Promise<AttendanceStatsDto> {
    const { startDate, endDate } = reqDto;

    if (!userId || !startDate || !endDate) {
      throw new ValidationException(ErrorCode.V000);
    }

    const stats = await this.timeManagementRepository.getAttendanceStats(
      userId,
      startDate,
      endDate,
    );

    return plainToInstance(AttendanceStatsDto, stats);
  }

  // TimeOff methods
  async createTimeOff(userId: string, timeOffData: CreateTimeOffReqDto): Promise<TimeOffResDto> {
    const { startDate, endDate } = timeOffData;

    if (isAfter(startDate, endDate) || isSameDay(startDate, endDate)) {
      throw new ValidationException(ErrorCode.TM007);
    }

    if (isBefore(startDate, new Date())) {
      throw new ValidationException(ErrorCode.TM008);
    }

    const totalDays = differenceInDays(endDate, startDate) + 1;

    const timeOffDataWithUser: Partial<TimeOff> = {
      ...timeOffData,
      userId: new Types.ObjectId(userId),
      totalDays,
      totalHours: timeOffData.totalHours || totalDays * 8, // Default 8 hours per day
      attachment: timeOffData.attachment ? new Types.ObjectId(timeOffData.attachment) : undefined,
    };

    const timeOff = await this.timeManagementRepository.createTimeOff(timeOffDataWithUser);

    return plainToInstance(TimeOffResDto, timeOff);
  }

  async getTimeOffHistory(
    userId: string,
    reqDto: ListHistoryReqDto,
  ): Promise<OffsetPaginatedDto<TimeOffResDto>> {
    const { startDate, endDate } = reqDto;

    if (!userId || !startDate || !endDate) {
      throw new ValidationException(ErrorCode.V000);
    }

    const filter = {
      userId: new Types.ObjectId(userId),
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
        { $and: [{ startDate: { $lte: startDate } }, { endDate: { $gte: endDate } }] },
      ],
    };

    const [timeOffs, metaDto] = await paginate<TimeOffDocument>(
      this.timeManagementRepository.timeOffModel,
      reqDto,
      {
        skipCount: false,
        takeAll: false,
        filter,
      },
    );

    return new OffsetPaginatedDto(plainToInstance(TimeOffResDto, timeOffs), metaDto);
  }

  async approveTimeOff(approvedBy: string, timeOffId: string): Promise<TimeOffResDto> {
    const timeOff = await this.timeManagementRepository.findTimeOffById(timeOffId);
    if (!timeOff) {
      throw new ValidationException(ErrorCode.TM006);
    }

    if (timeOff.status !== TimeOffStatus.PENDING) {
      throw new ValidationException(ErrorCode.TM007);
    }

    const updatedTimeOff = await this.timeManagementRepository.updateTimeOffStatus(timeOffId, {
      status: TimeOffStatus.APPROVED,
      approvedBy,
    });

    return plainToInstance(TimeOffResDto, updatedTimeOff);
  }

  async rejectTimeOff(
    approvedBy: string,
    timeOffId: string,
    rejectionReason: string,
  ): Promise<TimeOffResDto> {
    const timeOff = await this.timeManagementRepository.findTimeOffById(timeOffId);
    if (!timeOff) {
      throw new ValidationException(ErrorCode.TM006);
    }

    if (timeOff.status !== TimeOffStatus.PENDING) {
      throw new ValidationException(ErrorCode.TM007);
    }

    const updateData = {
      status: TimeOffStatus.REJECTED,
      approvedBy,
      rejectionReason,
    };

    const updatedTimeOff = await this.timeManagementRepository.updateTimeOffStatus(
      timeOffId,
      updateData,
    );

    return plainToInstance(TimeOffResDto, updatedTimeOff);
  }

  // Overtime methods
  async createOvertime(
    userId: string,
    overtimeData: CreateOvertimeReqDto,
  ): Promise<OvertimeResDto> {
    if (
      isAfter(overtimeData.startTime, overtimeData.endTime) ||
      isSameDay(overtimeData.startTime, overtimeData.endTime)
    ) {
      throw new ValidationException(ErrorCode.TM003);
    }

    if (isBefore(overtimeData.overtimeDate, new Date())) {
      throw new ValidationException(ErrorCode.TM004);
    }

    const totalHours = differenceInHours(overtimeData.endTime, overtimeData.startTime);

    const overtimeDataWithUser: Partial<Overtime> = {
      ...overtimeData,
      userId: new Types.ObjectId(userId),
      requestDate: new Date(),
      totalHours,
    };

    const overtime = await this.timeManagementRepository.createOvertime(overtimeDataWithUser);

    return plainToInstance(OvertimeResDto, overtime);
  }

  async getOvertimeHistory(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<OvertimeResDto[]> {
    const overtimes = await this.timeManagementRepository.findOvertimeByUser(
      userId,
      startDate,
      endDate,
    );

    return plainToInstance(OvertimeResDto, overtimes);
  }

  async approveOvertime(overtimeId: string, approvedBy: string): Promise<OvertimeResDto> {
    const overtime = await this.timeManagementRepository.findOvertimeById(overtimeId);
    if (!overtime) {
      throw new ValidationException(ErrorCode.TM008);
    }

    if (overtime.status !== OvertimeStatus.PENDING) {
      throw new ValidationException(ErrorCode.TM009);
    }

    const updatedOvertime = await this.timeManagementRepository.updateOvertimeStatus(
      overtimeId,
      OvertimeStatus.APPROVED,
      approvedBy,
    );

    return plainToInstance(OvertimeResDto, updatedOvertime);
  }

  async rejectOvertime(
    overtimeId: string,
    approvedBy: string,
    rejectionReason: string,
  ): Promise<OvertimeResDto> {
    const overtime = await this.timeManagementRepository.findOvertimeById(overtimeId);
    if (!overtime) {
      throw new ValidationException(ErrorCode.TM008);
    }

    if (overtime.status !== OvertimeStatus.PENDING) {
      throw new ValidationException(ErrorCode.TM009);
    }

    const updateData = {
      status: OvertimeStatus.REJECTED,
      approvedBy: new Types.ObjectId(approvedBy),
      approvedAt: new Date(),
      rejectionReason,
    };

    const updatedOvertime = await this.timeManagementRepository.updateOvertimeStatus(
      overtimeId,
      OvertimeStatus.REJECTED,
      approvedBy,
    );

    return plainToInstance(OvertimeResDto, updatedOvertime);
  }

  async getOvertimeStats(userId: string, startDate: Date, endDate: Date) {
    const overtimes = await this.timeManagementRepository.findOvertimeByUser(
      userId,
      startDate,
      endDate,
    );

    const stats = {
      totalRequests: overtimes.length,
      approvedRequests: overtimes.filter((o) => o.status === OvertimeStatus.APPROVED).length,
      rejectedRequests: overtimes.filter((o) => o.status === OvertimeStatus.REJECTED).length,
      pendingRequests: overtimes.filter((o) => o.status === OvertimeStatus.PENDING).length,
      totalHours: overtimes.reduce((sum, o) => sum + (o.totalHours || 0), 0),
      totalAmount: overtimes.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    };

    return stats;
  }

  // Helper methods using date-fns
  private isLate(clockInTime: Date): boolean {
    const workStartTime = new Date(clockInTime);
    workStartTime.setHours(9, 0, 0, 0); // 9:00 AM
    return isAfter(clockInTime, workStartTime);
  }

  private isEarlyLeave(clockOutTime: Date): boolean {
    const workEndTime = new Date(clockOutTime);
    workEndTime.setHours(17, 0, 0, 0); // 5:00 PM
    return isBefore(clockOutTime, workEndTime);
  }
}
