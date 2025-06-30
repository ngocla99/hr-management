import {
  DateField,
  DateFieldOptional,
  NumberField,
  StringField,
  StringFieldOptional,
  UUIDField,
} from "@/decorators/field.decorators";
import { Expose } from "class-transformer";

export class FileResDto {
  @UUIDField({
    description: "File ID",
    example: "507f1f77bcf86cd799439011",
  })
  @Expose()
  id: string;

  @StringField({
    description: "Original filename",
    example: "resume.pdf",
  })
  @Expose()
  originalName: string;

  @StringField({
    description: "System filename",
    example: "1640995200000_resume.pdf",
  })
  @Expose()
  filename: string;

  @StringField({
    description: "File MIME type",
    example: "application/pdf",
  })
  @Expose()
  mimeType: string;

  @NumberField({
    description: "File size in bytes",
    example: 1024000,
    min: 0,
  })
  @Expose()
  size: number;

  @StringField({
    description: "File download URL",
    example: "/api/files/507f1f77bcf86cd799439011/download",
  })
  @Expose()
  url: string;

  @StringField({
    description: "Storage type",
    example: "local",
  })
  @Expose()
  storage: string;

  @StringFieldOptional({
    description: "File tags",
    example: ["resume", "document"],
    each: true,
  })
  @Expose()
  tags?: string[];

  @StringFieldOptional({
    description: "File metadata (JSON string)",
    example: '{"department": "hr", "category": "resume"}',
  })
  @Expose()
  metadata?: Record<string, any>;

  @DateField({
    description: "Upload timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  @Expose()
  createdAt: Date;

  @DateFieldOptional({
    description: "File expiration date",
    example: "2024-12-31T23:59:59.000Z",
  })
  @Expose()
  expiresAt?: Date;
}
