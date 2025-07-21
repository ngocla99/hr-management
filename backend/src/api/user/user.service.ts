import { CursorPaginatedDto } from "@/common/dto/cursor-pagination/paginated.dto";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { ErrorCode } from "@/constants/error-code.constant";
import { ValidationException } from "@/exceptions/validation.exception";
import { buildPaginator } from "@/utils/cursor-pagination";
import { paginate } from "@/utils/offset-pagination";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import assert from "assert";
import { plainToInstance } from "class-transformer";
import { CreateUserReqDto } from "./dto/create-user.req.dto";
import { DeleteUsersReqDto } from "./dto/delete-users.req.dto";
import { ListUserStatsReqDto } from "./dto/list-user-stats.req.dto";
import { ListUserReqDto } from "./dto/list-user.req.dto";
import { LoadMoreUsersReqDto } from "./dto/load-more-users.req.dto";
import { UpdateUserReqDto } from "./dto/update-user.req.dto";
import { UserStatsDto } from "./dto/user-stats.dto";
import { UserResDto } from "./dto/user.res.dto";
import { UserDocument } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import { getUserFilter } from "./utils/user.util";
import { generateBaseUsername, generateUniqueUsername } from "./utils/username.util";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserReqDto): Promise<UserResDto> {
    const { firstName, lastName, email, username: providedUsername, ...rest } = dto;

    // check uniqueness of email
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new ValidationException(ErrorCode.U001);
    }

    // Handle username generation
    let username: string;
    if (providedUsername) {
      // Check if provided username is unique
      const usernameExists = await this.userRepository.isUsernameExists(providedUsername);
      if (usernameExists) {
        throw new ValidationException(ErrorCode.U004);
      }
      username = providedUsername;
    } else {
      // Generate unique username
      const baseUsername = generateBaseUsername(firstName ?? "", lastName ?? "");
      username = await generateUniqueUsername(baseUsername, (username) =>
        this.userRepository.isUsernameExists(username),
      );
    }

    const newUser = await this.userRepository.createUser({
      firstName,
      lastName,
      email,
      username,
      ...rest,
    });

    this.logger.debug(newUser);

    return plainToInstance(UserResDto, newUser);
  }

  async createMany(dto: CreateUserReqDto[]): Promise<UserResDto[]> {
    const users = await Promise.all(dto.map((user) => this.create(user)));
    return plainToInstance(UserResDto, users);
  }

  async getUserStats(reqDto: ListUserStatsReqDto): Promise<UserStatsDto> {
    const filter = getUserFilter(reqDto as ListUserReqDto);
    const stats = await this.userRepository.getUserStats(filter);
    return new UserStatsDto(
      stats.totalActive,
      stats.totalInactive,
      stats.totalSuspended,
      stats.totalUnverified,
    );
  }

  async findAll(reqDto: ListUserReqDto): Promise<OffsetPaginatedDto<UserResDto>> {
    const filter = getUserFilter(reqDto);
    const [users, metaDto] = await paginate<UserDocument>(this.userRepository.userModel, reqDto, {
      skipCount: false,
      takeAll: false,
      filter,
    });

    return new OffsetPaginatedDto(plainToInstance(UserResDto, users), metaDto);
  }

  async loadMoreUsers(reqDto: LoadMoreUsersReqDto): Promise<CursorPaginatedDto<UserResDto>> {
    const paginator = buildPaginator<UserDocument>(this.userRepository.userModel, {
      query: reqDto,
    });

    const { data, cursor } = await paginator.paginate({
      limit: reqDto.limit,
      order: "DESC",
      afterCursor: reqDto.afterCursor,
      beforeCursor: reqDto.beforeCursor,
    });

    return new CursorPaginatedDto(plainToInstance(UserResDto, data), {
      limit: reqDto.limit ?? 10,
      totalRecords: data.length,
      afterCursor: cursor.afterCursor ?? undefined,
      beforeCursor: cursor.beforeCursor ?? undefined,
    });
  }

  async findOne(id: string): Promise<UserResDto> {
    assert(id, "id is required");
    const user = await this.userRepository.findById(id);

    return plainToInstance(UserResDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserReqDto) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(ErrorCode.U002);
    }

    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    return plainToInstance(UserResDto, updatedUser);
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.userRepository.hardDeleteUser(id);

    if (result.deletedCount === 0) {
      throw new NotFoundException(ErrorCode.U002);
    }

    return {
      message: "User deleted successfully",
    };
  }

  async deleteMany(reqDto: DeleteUsersReqDto): Promise<{ message: string }> {
    const result = await this.userRepository.hardDeleteManyUsers(reqDto.ids);

    if (result.deletedCount === 0) {
      throw new NotFoundException(ErrorCode.U002);
    }

    return {
      message: "Users deleted successfully",
    };
  }

  async suspend(id: string): Promise<UserResDto> {
    const user = await this.userRepository.suspendUser(id);
    return plainToInstance(UserResDto, user);
  }

  async activate(id: string): Promise<UserResDto> {
    const user = await this.userRepository.activateUser(id);
    return plainToInstance(UserResDto, user);
  }
}
