import { OffsetPaginationDto } from "@/common/dto/offset-pagination/offset-pagination.dto";
import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import { Model } from "mongoose";

export async function paginate<T>(
  model: Model<T>,
  pageOptionsDto: PageOptionsDto,
  options?: Partial<{
    skipCount: boolean;
    takeAll: boolean;
  }>,
): Promise<[T[], OffsetPaginationDto]> {
  let query = model.find();

  if (!options?.takeAll) {
    query = query.skip(pageOptionsDto.offset).limit(pageOptionsDto.limit!);
  }

  const entities = await query.exec();

  let count = -1;

  if (!options?.skipCount) {
    count = await model.countDocuments().exec();
  }

  const metaDto = new OffsetPaginationDto(count, pageOptionsDto);

  return [entities, metaDto];
}
