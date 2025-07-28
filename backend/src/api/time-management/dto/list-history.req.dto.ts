import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import { DateFieldOptional, StringFieldOptional } from "@/decorators/field.decorators";

export class ListHistoryReqDto extends PageOptionsDto {
  @StringFieldOptional({
    description: "Filter by user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  readonly userId?: string;

  @DateFieldOptional({
    description: "Filter by start date (inclusive)",
    example: "2024-01-01T00:00:00.000Z",
  })
  readonly startDate?: Date;

  @DateFieldOptional({
    description: "Filter by end date (inclusive)",
    example: "2024-01-31T23:59:59.999Z",
  })
  readonly endDate?: Date;
}
