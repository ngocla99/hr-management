import { ApiProperty } from "@nestjs/swagger";
import { FileResDto } from "./file.res.dto";

export class FileListResDto {
  @ApiProperty({
    description: "List of files",
    type: [FileResDto],
  })
  files: FileResDto[];

  @ApiProperty({
    description: "Total count of files",
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: "Current page",
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: "Items per page",
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: "Total storage used in bytes",
    example: 10485760,
  })
  totalSize: number;
}
