import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum GENDER {
  Male = "MALE",
  Female = "FEMALE",
  Other = "OTHER",
}

export enum ROLE {
  Admin = "ADMIN",
  User = "USER",
}

@Schema({
  timestamps: true,
})
export class User extends BaseEntity {
  @Prop({ required: true, minlength: 2, maxlength: 60 })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  })
  email: string;

  @Prop({
    match: /^([+]\d{2})?\d{10}$/,
  })
  phoneNumber: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  })
  avatar: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({
    enum: GENDER,
  })
  gender: string;

  @Prop({
    enum: ROLE,
  })
  role: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);
