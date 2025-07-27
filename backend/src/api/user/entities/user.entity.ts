import { BaseEntity } from "@/common/entities/base.entity";
import { UserRole } from "@/constants/roles.constant";
import { hashPassword } from "@/utils/password.util";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, UpdateQuery } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  NOT_VERIFIED = "not_verified",
}

@Schema({
  timestamps: true,
})
export class User extends BaseEntity {
  // Basic Information
  @Prop({ minlength: 2, maxlength: 60 })
  firstName: string;

  @Prop({ minlength: 2, maxlength: 60 })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  })
  email: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    select: false,
    match:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}|\\/'"<>,.;:`~+=_-])[A-Za-z\d@$!%*?&#^()[\]{}|\\/'"<>,.;:`~+=_-]{8,}$/,
  })
  password: string;

  @Prop({
    match: /^([+]\d{2})?\d{10}$/,
  })
  phoneNumber: string;

  @Prop({
    default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  })
  avatar: string;

  // Personal Information (Basic)
  @Prop()
  dateOfBirth: Date;

  @Prop({
    enum: Gender,
  })
  gender: string;

  @Prop()
  bio?: string;

  // System Information
  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role: string;

  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: string;

  @Prop()
  lastLogin?: Date;

  @Prop({ default: false })
  emailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaFactory = () => {
  const userSchema = UserSchema;

  // Indexes
  userSchema.index({ email: 1 }, { unique: true });
  userSchema.index({ username: 1 }, { unique: true });
  userSchema.index({ status: 1 });
  userSchema.index({ role: 1 });

  // Password hashing middleware
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await hashPassword(this.password);
    next();
  });

  userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() as UpdateQuery<UserDocument>;
    if (update?.password) {
      update.password = await hashPassword(update.password);
    }
    next();
  });

  // Virtual for full name
  userSchema.virtual("fullName").get(function () {
    if (!this.firstName && !this.lastName) return "N/A";
    return `${this.firstName ?? ""} ${this.lastName ?? ""}`;
  });

  // Virtual for age calculation
  userSchema.virtual("age").get(function () {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  });

  // Ensure virtuals are included in JSON output
  userSchema.set("toJSON", { virtuals: true });
  userSchema.set("toObject", { virtuals: true });

  return userSchema;
};
