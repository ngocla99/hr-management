import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UploadFileReqDto {
  @ApiPropertyOptional({
    description: "File tags for categorization",
    type: [String],
    example: ["resume", "document"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: "Additional metadata for the file",
    example: { department: "hr", category: "resume" },
  })
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description: "Expiration date for the file (ISO string)",
    example: "2024-12-31T23:59:59.000Z",
  })
  @IsOptional()
  @IsString()
  expiresAt?: string;
}
