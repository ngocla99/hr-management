import { DateFieldOptional, StringFieldOptional } from "@/decorators/field.decorators";
import { Expose } from "class-transformer";

export class UploadFileReqDto {
  @StringFieldOptional({
    description: "File tags for categorization",
    example: ["resume", "document"],
    each: true,
  })
  @Expose()
  tags?: string[];

  @StringFieldOptional({
    description: "Additional metadata for the file (JSON string)",
    example: '{"department": "hr", "category": "resume"}',
  })
  @Expose()
  metadata?: string;

  @DateFieldOptional({
    description: "Expiration date for the file",
    example: "2024-12-31T23:59:59.000Z",
  })
  @Expose()
  expiresAt?: Date;
}
