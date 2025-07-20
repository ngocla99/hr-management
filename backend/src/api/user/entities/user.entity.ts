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

export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
}

export enum BloodType {
  A = "A",
  B = "B",
  AB = "AB",
  O = "O",
}

export enum EmploymentType {
  FULLTIME = "fulltime",
  PARTTIME = "parttime",
  CONTRACT = "contract",
  INTERN = "intern",
  FREELANCE = "freelance",
}

export enum JobLevel {
  ENTRY = "entry",
  JUNIOR = "junior",
  MID = "mid",
  SENIOR = "senior",
  LEAD = "lead",
  MANAGER = "manager",
  DIRECTOR = "director",
  EXECUTIVE = "executive",
}

export enum JobRole {
  FE_DEVELOPER = "fe_developer",
  BE_DEVELOPER = "be_developer",
  FULLSTACK_DEVELOPER = "fullstack_developer",
  MOBILE_DEVELOPER = "mobile_developer",
  DESIGNER = "designer",
  QA = "qa",
  HR = "hr",
  ACCOUNTANT = "accountant",
}

export enum Department {
  QA = "qa",
  IT = "it",
  HR = "hr",
  FINANCE = "finance",
  MARKETING = "marketing",
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
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  })
  email: string;

  @Prop({
    match: /^([+]\d{2})?\d{10}$/,
  })
  phoneNumber: string;

  @Prop({
    required: true,
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
    default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  })
  avatar: string;

  // Personal Information
  @Prop()
  dateOfBirth: Date;

  @Prop({
    enum: Gender,
  })
  gender: string;

  @Prop({
    enum: MaritalStatus,
  })
  maritalStatus: string;

  @Prop()
  religion: string;

  @Prop()
  placeOfBirth: string;

  @Prop({
    enum: BloodType,
  })
  bloodType: string;

  // Address Information
  @Prop()
  residentialAddress: string;

  @Prop()
  residentialAddressNotes: string;

  @Prop()
  citizenIdAddress: string;

  @Prop()
  citizenIdAddressNotes: string;

  // Contact Information
  @Prop({
    match: /^([+]\d{2})?\d{10}$/,
  })
  emergencyContactPhone: string;

  @Prop()
  emergencyContactName: string;

  @Prop()
  emergencyContactRelationship: string;

  // Employment Information
  @Prop()
  employeeId: string;

  @Prop()
  dateStarted: Date;

  @Prop({
    type: String,
    enum: JobRole,
  })
  jobRole: string;

  @Prop({
    type: String,
    enum: JobLevel,
  })
  jobLevel: string;

  @Prop({
    type: String,
    enum: EmploymentType,
    default: EmploymentType.FULLTIME,
  })
  employmentType: string;

  @Prop({
    type: String,
    enum: Department,
  })
  department: string;

  @Prop()
  contractEndDate: Date;

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
  lastClockedIn: Date;

  @Prop()
  lastMessaged: Date;

  @Prop()
  tags: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaFactory = () => {
  const userSchema = UserSchema;

  // Indexes
  userSchema.index({ email: 1 });
  userSchema.index({ username: 1 });
  userSchema.index({ employeeId: 1 });
  userSchema.index({ status: 1 });
  userSchema.index({ department: 1 });
  userSchema.index({ jobRole: 1 });

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
    return `${this.firstName} ${this.lastName}`;
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

  // Virtual for years of service
  userSchema.virtual("yearsOfService").get(function () {
    if (!this.dateStarted) return null;
    const today = new Date();
    const startDate = new Date(this.dateStarted);
    let years = today.getFullYear() - startDate.getFullYear();
    const monthDiff = today.getMonth() - startDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
      years--;
    }

    return years;
  });

  // Ensure virtuals are included in JSON output
  userSchema.set("toJSON", { virtuals: true });
  userSchema.set("toObject", { virtuals: true });

  return userSchema;
};
