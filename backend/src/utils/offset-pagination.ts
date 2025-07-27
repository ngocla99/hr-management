import { OffsetPaginationDto } from "@/common/dto/offset-pagination/offset-pagination.dto";
import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import { Model } from "mongoose";

export async function paginate<T>(
  model: Model<T>,
  pageOptionsDto: PageOptionsDto,
  options?: Partial<{
    skipCount: boolean;
    takeAll: boolean;
    filter: Record<string, any>;
    populate: Record<string, string>;
  }>,
): Promise<[T[], OffsetPaginationDto]> {
  let query = model.find(options?.filter || {});

  if (pageOptionsDto.sort) {
    const [field, direction] = pageOptionsDto.sort.split(".");
    if (field) {
      query = query.sort({ [field]: direction === "desc" ? -1 : 1 });
    }
  }

  if (!options?.takeAll) {
    query = query.skip(pageOptionsDto.offset).limit(pageOptionsDto.limit!);
  }

  if (options?.populate) {
    Object.entries(options.populate).forEach(([key, value]) => {
      query = query.populate(key, value);
    });
  }

  const entities = await query.exec();

  let count = -1;

  if (!options?.skipCount) {
    count = await model.countDocuments(options?.filter || {}).exec();
  }

  const metaDto = new OffsetPaginationDto(count, pageOptionsDto);

  return [entities, metaDto];
}
