import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { UserStatsDto } from "./user-stats.dto";
import { UserResDto } from "./user.res.dto";

export class UserListResDto extends OffsetPaginatedDto<UserResDto> {
  @ApiProperty({ type: UserStatsDto })
  @Expose()
  readonly stats: UserStatsDto;

  constructor(data: UserResDto[], pagination: any, stats: UserStatsDto) {
    super(data, pagination);
    this.stats = stats;
  }
}
