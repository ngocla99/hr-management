import {
  NumberField,
  StringField,
  StringFieldOptional,
  UUIDField,
} from "@/decorators/field.decorators";
import { lowerCaseTransformer } from "@/utils/transformers/lower-case.transformer";
import { Expose, Transform } from "class-transformer";

export class CreateFileReqDto {
  @StringField()
  @Transform(lowerCaseTransformer)
  @Expose()
  filename: string;

  @StringField()
  @Expose()
  originalName: string;

  @StringField()
  @Expose()
  mimeType: string;

  @NumberField()
  @Expose()
  size: number;

  @StringField()
  @Expose()
  path: string;

  @StringField()
  @Expose()
  url: string;

  @StringField()
  @Expose()
  storage: string;

  @StringFieldOptional()
  @Expose()
  tags?: string[];

  @StringFieldOptional()
  @Expose()
  bucket?: string;

  @StringFieldOptional()
  @Expose()
  key?: string;

  @UUIDField({
    description: "ID of the user who uploaded the file",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Expose()
  uploadedBy: string;
}
