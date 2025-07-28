import { JwtPayloadType } from "@/api/auth/types/jwt-payload.type";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { Permission } from "@/constants/roles.constant";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { ApiAuth } from "@/decorators/http.decorators";
import { RequirePermission } from "@/decorators/roles.decorator";
import { RolesGuard } from "@/guards/roles.guard";
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AttendanceStatsDto } from "./dto/attendance-stats.res.dto";
import { AttendanceResDto } from "./dto/attendance.res.dto";
import { ClockInReqDto } from "./dto/clock-in.req.dto";
import { ClockOutReqDto } from "./dto/clock-out.req.dto";
import { CreateOvertimeReqDto } from "./dto/create-overtime.req.dto";
import { CreateTimeOffReqDto } from "./dto/create-time-off.req.dto";
import { ListHistoryReqDto } from "./dto/list-history.req.dto";
import { OvertimeResDto } from "./dto/overtime.res.dto";
import { TimeOffResDto } from "./dto/time-off.res.dto";
import { TimeManagementService } from "./time-management.service";

@ApiTags("time-management")
@Controller({
  path: "time-management",
  version: "1",
})
@UseGuards(RolesGuard)
export class TimeManagementController {
  constructor(private readonly timeManagementService: TimeManagementService) {}

  // Attendance endpoints
  @Post("attendance/clock-in")
  @ApiAuth({
    type: AttendanceResDto,
    summary: "Clock in for the day",
  })
  @RequirePermission(Permission.CREATE_ATTENDANCE)
  async clockIn(
    @CurrentUser() user: JwtPayloadType,
    @Body() clockInData: ClockInReqDto,
  ): Promise<AttendanceResDto> {
    return await this.timeManagementService.clockIn(user.id, clockInData);
  }

  @Post("attendance/clock-out")
  @ApiAuth({
    type: AttendanceResDto,
    summary: "Clock out for the day",
  })
  @RequirePermission(Permission.CREATE_ATTENDANCE)
  async clockOut(
    @CurrentUser() user: JwtPayloadType,
    @Body() clockOutData: ClockOutReqDto,
  ): Promise<AttendanceResDto> {
    return await this.timeManagementService.clockOut(user.id, clockOutData);
  }

  @Get("attendance/history")
  @ApiAuth({
    type: AttendanceResDto,
    summary: "Get attendance history",
    isPaginated: true,
  })
  @RequirePermission(Permission.READ_ATTENDANCE)
  async getAttendanceHistory(
    @CurrentUser() user: JwtPayloadType,
    @Query() reqDto: ListHistoryReqDto,
  ): Promise<OffsetPaginatedDto<AttendanceResDto>> {
    return await this.timeManagementService.getAttendanceHistory(user.id, reqDto);
  }

  @Get("attendance/stats")
  @ApiAuth({
    type: AttendanceStatsDto,
    summary: "Get attendance statistics",
  })
  @RequirePermission(Permission.READ_ATTENDANCE)
  async getAttendanceStats(
    @CurrentUser() user: JwtPayloadType,
    @Query() reqDto: ListHistoryReqDto,
  ): Promise<AttendanceStatsDto> {
    return await this.timeManagementService.getAttendanceStats(user.id, reqDto);
  }

  // TimeOff endpoints
  @Post("time-off")
  @ApiAuth({
    type: TimeOffResDto,
    summary: "Create time off request",
  })
  @RequirePermission(Permission.CREATE_TIME_OFF)
  async createTimeOff(
    @CurrentUser() user: JwtPayloadType,
    @Body() timeOffReqDto: CreateTimeOffReqDto,
  ): Promise<TimeOffResDto> {
    return await this.timeManagementService.createTimeOff(user.id, timeOffReqDto);
  }

  @Get("time-off/history")
  @ApiAuth({
    type: TimeOffResDto,
    isPaginated: true,
    summary: "Get time off history",
  })
  @RequirePermission(Permission.READ_TIME_OFF)
  async getTimeOffHistory(
    @CurrentUser() user: JwtPayloadType,
    @Query() reqDto: ListHistoryReqDto,
  ): Promise<OffsetPaginatedDto<TimeOffResDto>> {
    return await this.timeManagementService.getTimeOffHistory(user.id, reqDto);
  }

  @Put("time-off/:id/approve")
  @ApiAuth({
    type: TimeOffResDto,
    summary: "Approve time off request",
  })
  @RequirePermission(Permission.APPROVE_TIME_OFF)
  async approveTimeOff(
    @CurrentUser() user: JwtPayloadType,
    @Param("id") timeOffId: string,
  ): Promise<TimeOffResDto> {
    return await this.timeManagementService.approveTimeOff(user.id, timeOffId);
  }

  @Put("time-off/:id/reject")
  @ApiAuth({
    type: TimeOffResDto,
    summary: "Reject time off request",
  })
  @RequirePermission(Permission.APPROVE_TIME_OFF)
  async rejectTimeOff(
    @CurrentUser() user: JwtPayloadType,
    @Param("id") timeOffId: string,
    @Body("rejectionReason") rejectionReason: string,
  ): Promise<TimeOffResDto> {
    return await this.timeManagementService.rejectTimeOff(user.id, timeOffId, rejectionReason);
  }

  //   @Get("time-off/stats")
  //   @ApiAuth({
  //     type: Object,
  //     summary: "Get time off statistics",
  //   })
  //   @RequirePermission(Permission.READ_TIME_OFF)
  //   async getTimeOffStats(@Query() reqDto: ListHistoryReqDto):  {
  //     return await this.timeManagementService.getTimeOffStats(reqDto);
  //   }

  // Overtime endpoints
  @Post("overtime")
  @ApiAuth({
    type: OvertimeResDto,
    summary: "Create overtime request",
  })
  @RequirePermission(Permission.CREATE_OVERTIME)
  async createOvertime(
    @CurrentUser() user: JwtPayloadType,
    @Body() overtimeData: CreateOvertimeReqDto,
  ): Promise<OvertimeResDto> {
    return await this.timeManagementService.createOvertime(user.id, overtimeData);
  }

  @Get("overtime/history")
  @ApiAuth({
    type: OvertimeResDto,
    summary: "Get overtime history",
  })
  @RequirePermission(Permission.READ_OVERTIME)
  async getOvertimeHistory(
    @CurrentUser() user: JwtPayloadType,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string,
  ): Promise<OvertimeResDto[]> {
    return await this.timeManagementService.getOvertimeHistory(
      user.id,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Put("overtime/:id/approve")
  @ApiAuth({
    type: OvertimeResDto,
    summary: "Approve overtime request",
  })
  @RequirePermission(Permission.APPROVE_OVERTIME)
  async approveOvertime(
    @CurrentUser() user: JwtPayloadType,
    @Param("id") overtimeId: string,
  ): Promise<OvertimeResDto> {
    return await this.timeManagementService.approveOvertime(overtimeId, user.id);
  }

  @Put("overtime/:id/reject")
  @ApiAuth({
    type: OvertimeResDto,
    summary: "Reject overtime request",
  })
  @RequirePermission(Permission.APPROVE_OVERTIME)
  async rejectOvertime(
    @CurrentUser() user: JwtPayloadType,
    @Param("id") overtimeId: string,
    @Body("rejectionReason") rejectionReason: string,
  ): Promise<OvertimeResDto> {
    return await this.timeManagementService.rejectOvertime(overtimeId, user.id, rejectionReason);
  }

  @Get("overtime/stats")
  @ApiAuth({
    type: Object,
    summary: "Get overtime statistics",
  })
  @RequirePermission(Permission.READ_OVERTIME)
  async getOvertimeStats(
    @CurrentUser() user: JwtPayloadType,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string,
  ) {
    return await this.timeManagementService.getOvertimeStats(
      user.id,
      new Date(startDate),
      new Date(endDate),
    );
  }
}
