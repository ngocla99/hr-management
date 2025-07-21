import { CursorPaginatedDto } from "@/common/dto/cursor-pagination/paginated.dto";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { MessageResponse, Uuid } from "@/common/types/common.type";
import { UserRole } from "@/constants/roles.constant";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { ApiAuth } from "@/decorators/http.decorators";
import { RequireRole } from "@/decorators/roles.decorator";
import { RolesGuard } from "@/guards/roles.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateUserReqDto } from "./dto/create-user.req.dto";
import { CreateUsersReqDto } from "./dto/create-users.req.dto";
import { DeleteUsersReqDto } from "./dto/delete-users.req.dto";
import { ListUserStatsReqDto } from "./dto/list-user-stats.req.dto";
import { ListUserReqDto } from "./dto/list-user.req.dto";
import { LoadMoreUsersReqDto } from "./dto/load-more-users.req.dto";
import { UpdateUserReqDto } from "./dto/update-user.req.dto";
import { UserStatsDto } from "./dto/user-stats.dto";
import { UserResDto } from "./dto/user.res.dto";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller({
  path: "users",
  version: "1",
})
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiAuth({
    type: UserResDto,
    summary: "Get current user",
  })
  @Get("me")
  async getCurrentUser(@CurrentUser("id") userId: Uuid): Promise<UserResDto> {
    return await this.userService.findOne(userId);
  }

  @Post()
  @ApiAuth({
    type: UserResDto,
    summary: "Create user",
    statusCode: HttpStatus.CREATED,
  })
  @RequireRole(UserRole.ADMIN)
  async createUser(@Body() createUserDto: CreateUserReqDto): Promise<UserResDto> {
    return await this.userService.create(createUserDto);
  }

  @Post("create-many")
  @ApiAuth({
    type: UserResDto,
    summary: "Create many users",
    statusCode: HttpStatus.CREATED,
  })
  @RequireRole(UserRole.ADMIN)
  async createManyUsers(@Body() createUsersDto: CreateUsersReqDto): Promise<UserResDto[]> {
    return await this.userService.createMany(createUsersDto.users);
  }

  @Get("stats")
  @ApiAuth({
    type: UserStatsDto,
    summary: "Get user stats",
  })
  async getUserStats(@Query() reqDto: ListUserStatsReqDto): Promise<UserStatsDto> {
    return await this.userService.getUserStats(reqDto);
  }

  @Get()
  @ApiAuth({
    type: OffsetPaginatedDto<UserResDto>,
    summary: "List users with statistics",
    isPaginated: true,
  })
  async findAllUsers(@Query() reqDto: ListUserReqDto): Promise<OffsetPaginatedDto<UserResDto>> {
    return await this.userService.findAll(reqDto);
  }

  @Get("/load-more")
  @ApiAuth({
    type: UserResDto,
    summary: "Load more users",
    isPaginated: true,
    paginationType: "cursor",
  })
  async loadMoreUsers(
    @Query() reqDto: LoadMoreUsersReqDto,
  ): Promise<CursorPaginatedDto<UserResDto>> {
    return await this.userService.loadMoreUsers(reqDto);
  }

  @Get(":id")
  @ApiAuth({ type: UserResDto, summary: "Find user by id" })
  @ApiParam({ name: "id", type: "String" })
  async findUser(@Param("id") id: string): Promise<UserResDto> {
    return await this.userService.findOne(id);
  }

  @Patch(":id")
  @ApiAuth({ type: UserResDto, summary: "Update user" })
  @ApiParam({ name: "id", type: "String" })
  updateUser(@Param("id") id: string, @Body() reqDto: UpdateUserReqDto) {
    return this.userService.update(id, reqDto);
  }

  @Delete("delete-many")
  @ApiAuth({
    summary: "Delete many users",
    errorResponses: [400, 401, 500],
  })
  @ApiBody({ type: DeleteUsersReqDto })
  deleteManyUsers(@Body() reqDto: DeleteUsersReqDto): Promise<MessageResponse> {
    return this.userService.deleteMany(reqDto);
  }

  @Delete(":id")
  @ApiAuth({
    summary: "Delete user",
    errorResponses: [400, 401, 500],
  })
  @ApiParam({ name: "id", type: "String" })
  removeUser(@Param("id") id: string): Promise<MessageResponse> {
    return this.userService.delete(id);
  }

  @Patch(":id/suspend")
  @ApiAuth({
    summary: "Suspend user",
    errorResponses: [400, 401, 500],
  })
  @ApiParam({ name: "id", type: "String" })
  suspendUser(@Param("id") id: string): Promise<UserResDto> {
    return this.userService.suspend(id);
  }

  @Patch(":id/activate")
  @ApiAuth({
    summary: "Activate user",
    errorResponses: [400, 401, 500],
  })
  @ApiParam({ name: "id", type: "String" })
  activateUser(@Param("id") id: string): Promise<UserResDto> {
    return this.userService.activate(id);
  }

  @ApiAuth()
  @Post("me/change-password")
  changePassword() {
    return "change-password";
  }
}
