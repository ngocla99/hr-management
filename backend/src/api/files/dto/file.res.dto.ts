import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FileResDto {
  @ApiProperty({
    description: "File ID",
    example: "507f1f77bcf86cd799439011",
  })
  id: string;

  @ApiProperty({
    description: "Original filename",
    example: "resume.pdf",
  })
  originalName: string;

  @ApiProperty({
    description: "System filename",
    example: "1640995200000_resume.pdf",
  })
  filename: string;

  @ApiProperty({
    description: "File MIME type",
    example: "application/pdf",
  })
  mimeType: string;

  @ApiProperty({
    description: "File size in bytes",
    example: 1024000,
  })
  size: number;

  @ApiProperty({
    description: "File download URL",
    example: "/api/files/507f1f77bcf86cd799439011/download",
  })
  url: string;

  @ApiProperty({
    description: "Storage type",
    example: "local",
    enum: ["local", "s3", "gridfs"],
  })
  storage: string;

  @ApiPropertyOptional({
    description: "File tags",
    type: [String],
    example: ["resume", "document"],
  })
  tags?: string[];

  @ApiPropertyOptional({
    description: "File metadata",
    example: { department: "hr", category: "resume" },
  })
  metadata?: Record<string, any>;

  @ApiProperty({
    description: "Upload timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  createdAt: Date;

  @ApiPropertyOptional({
    description: "File expiration date",
    example: "2024-12-31T23:59:59.000Z",
  })
  expiresAt?: Date;
}
