import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FileDocument = HydratedDocument<File>;

@Schema({
  timestamps: true,
})
export class File extends BaseEntity {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  path: string;

  @Prop()
  url?: string;

  @Prop({
    type: String,
    enum: ["local", "s3", "gridfs"],
    default: "local",
  })
  storage: string;

  @Prop()
  bucket?: string;

  @Prop()
  key?: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  uploadedBy: Types.ObjectId;

  @Prop({
    type: String,
    enum: ["active", "deleted"],
    default: "active",
  })
  status: string;

  @Prop()
  tags?: string[];

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop()
  expiresAt?: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
