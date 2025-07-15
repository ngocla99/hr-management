import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_LIMIT } from "@/constants/app.constant";
import { NumberFieldOptional, StringFieldOptional } from "@/decorators/field.decorators";

export class PageOptionsDto {
  @NumberFieldOptional({
    min: 1,
    default: DEFAULT_PAGE_LIMIT,
    int: true,
  })
  readonly limit?: number = DEFAULT_PAGE_LIMIT;

  @NumberFieldOptional({
    min: 1,
    default: DEFAULT_CURRENT_PAGE,
    int: true,
  })
  readonly page?: number = DEFAULT_CURRENT_PAGE;

  @StringFieldOptional()
  readonly q?: string;

  @StringFieldOptional({
    description: "Sort by field and direction, e.g., 'createdAt.desc' or 'username.asc'",
  })
  readonly sort?: string;

  get offset() {
    return this.page ? (this.page - 1) * this.limit! : 0;
  }
}
