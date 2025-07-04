import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { Uuid } from "@/common/types/common.type";
import { ErrorCode } from "@/constants/error-code.constant";
import { ValidationException } from "@/exceptions/validation.exception";
import { paginate } from "@/utils/offset-pagination";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import assert from "assert";
import { plainToInstance } from "class-transformer";
import { CreateUserReqDto } from "./dto/create-user.req.dto";
import { ListUserReqDto } from "./dto/list-user.req.dto";
import { UpdateUserReqDto } from "./dto/update-user.req.dto";
import { UserResDto } from "./dto/user.res.dto";
import { UserDocument } from "./entities/user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserReqDto): Promise<UserResDto> {
    const { username, email, password, role } = dto;

    // check uniqueness of username/email
    const user = await this.userRepository.findByUsername(username);

    if (user) {
      throw new ValidationException(ErrorCode.U001);
    }

    const newUser = await this.userRepository.createUser({
      username,
      email,
      password,
      role,
    });

    this.logger.debug(newUser);

    return plainToInstance(UserResDto, newUser);
  }

  async findAll(reqDto: ListUserReqDto): Promise<OffsetPaginatedDto<UserResDto>> {
    const [users, metaDto] = await paginate<UserDocument>(this.userRepository.userModel, reqDto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(plainToInstance(UserResDto, users), metaDto);
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
    console.log("🚀 ~ UserService ~ findOne ~ user:", user);
    console.log(plainToInstance(UserResDto, user));

    return plainToInstance(UserResDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserReqDto) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(ErrorCode.U002);
    }

    await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: Uuid) {
    const user = await this.userRepository.softDeleteUser(id);

    if (!user) {
      throw new NotFoundException(ErrorCode.U002);
    }

    return plainToInstance(UserResDto, user);
  }
}
