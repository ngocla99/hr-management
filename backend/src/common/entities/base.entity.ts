import { Prop } from "@nestjs/mongoose";
import { Expose, Transform } from "class-transformer";
import { ObjectId } from "mongoose";

export class BaseEntity {
  _id?: ObjectId | string;

  @Expose()
  // eslint-disable-next-line
  @Transform(({ obj }) => obj?._id?.toString(), { toClassOnly: true })
  id?: string;

  @Prop({ default: null })
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}
