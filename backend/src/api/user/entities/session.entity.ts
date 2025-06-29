import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SessionDocument = HydratedDocument<Session>;

@Schema({
  timestamps: true,
})
export class Session extends BaseEntity {
  @Prop({ required: true })
  hash: string;

  @Prop({ required: true, ref: "User" })
  userId: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
