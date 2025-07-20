import { ErrorCode } from "@/constants/error-code.constant";
import { ValidationException } from "@/exceptions/validation.exception";
import { paginate } from "@/utils/offset-pagination";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import assert from "assert";
import { plainToInstance } from "class-transformer";
import { CreateUserReqDto } from "./dto/create-user.req.dto";
import { DeleteUsersReqDto } from "./dto/delete-users.req.dto";
import { ListUserReqDto } from "./dto/list-user.req.dto";
import { UpdateUserReqDto } from "./dto/update-user.req.dto";
import { UserListResDto } from "./dto/user-list.res.dto";
import { UserStatsDto } from "./dto/user-stats.dto";
import { UserResDto } from "./dto/user.res.dto";
import { UserDocument } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
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

  async findAll(reqDto: ListUserReqDto): Promise<UserListResDto> {
    const filter: Record<string, any> = {};
    if (reqDto.role) {
      filter.role = reqDto.role;
    }
    if (reqDto.status) {
      filter.status = reqDto.status;
    }

    const createdAtFilter: Record<string, Date> = {};
    if (reqDto.createdAtFrom) {
      createdAtFilter.$gte = reqDto.createdAtFrom;
    }
    if (reqDto.createdAtTo) {
      createdAtFilter.$lte = reqDto.createdAtTo;
    }
    if (Object.keys(createdAtFilter).length > 0) {
      filter.createdAt = createdAtFilter;
    }

    if (reqDto.username) {
      filter.username = { $regex: reqDto.username, $options: "i" };
    }

    if (reqDto.fullName) {
      filter.$or = [
        { firstName: { $regex: reqDto.fullName, $options: "i" } },
        { lastName: { $regex: reqDto.fullName, $options: "i" } },
      ];
    }

    if (reqDto.department) {
      filter.department = reqDto.department;
    }

    if (reqDto.jobRole) {
      filter.jobRole = reqDto.jobRole;
    }

    if (reqDto.employmentType) {
      filter.employmentType = reqDto.employmentType;
    }

    const [userList, paginationMeta] = await paginate<UserDocument>(
      this.userRepository.userModel,
      reqDto,
      {
        skipCount: false,
        takeAll: false,
        filter,
      },
    );

    const stats = new UserStatsDto(
      userList.filter((user) => user.status === "active").length,
      userList.filter((user) => user.status === "inactive").length,
      userList.filter((user) => user.status === "suspended").length,
      userList.filter((user) => user.status === "not_verified").length,
    );

    return new UserListResDto(plainToInstance(UserResDto, userList), paginationMeta, stats);
  }

  // async loadMoreUsers(reqDto: LoadMoreUsersReqDto): Promise<CursorPaginatedDto<UserResDto>> {
  //   const paginator = buildPaginator<UserDocument>({
  //     entity: this.userRepository.userModel,
  //     alias: "user",
  //     paginationKeys: ["createdAt"],
  //     query: {
  //       limit: reqDto.limit,
  //       order: "DESC",
  //       afterCursor: reqDto.afterCursor,
  //       beforeCursor: reqDto.beforeCursor,
  //     },
  //   });

  //   const { data, cursor } = await paginator.paginate(queryBuilder);

  //   const metaDto = new CursorPaginationDto(
  //     data.length,
  //     cursor.afterCursor,
  //     cursor.beforeCursor,
  //     reqDto,
  //   );

  //   return new CursorPaginatedDto(plainToInstance(UserResDto, data), metaDto);
  // }

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
