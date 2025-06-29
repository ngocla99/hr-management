import { ClassField, NumberField } from "@/decorators/field.decorators";
import { Expose } from "class-transformer";
import { FileResDto } from "./file.res.dto";

export class FileListResDto {
  @ClassField(() => FileResDto, {
    description: "List of files",
    each: true,
  })
  @Expose()
  files: FileResDto[];

  @NumberField({
    description: "Total count of files",
    example: 25,
    min: 0,
  })
  @Expose()
  total: number;

  @NumberField({
    description: "Current page",
    example: 1,
    min: 1,
  })
  @Expose()
  page: number;

  @NumberField({
    description: "Items per page",
    example: 10,
    min: 1,
  })
  @Expose()
  limit: number;

  @NumberField({
    description: "Total storage used in bytes",
    example: 10485760,
    min: 0,
  })
  @Expose()
  totalSize: number;
}
