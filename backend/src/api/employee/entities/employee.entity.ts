import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EmployeeDocument = HydratedDocument<Employee>;

export enum BloodType {
  A = "a",
  B = "b",
  AB = "ab",
  O = "o",
}

export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
  WIDOWED = "widowed",
}

export enum EmploymentStatus {
  ACTIVE = "active",
  TERMINATED = "terminated",
  ON_LEAVE = "on_leave",
  PROBATION = "probation",
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
  IT = "it",
  HR = "hr",
  FINANCE = "finance",
  MARKETING = "marketing",
  SALES = "sales",
}

@Schema({
  timestamps: true,
})
export class Employee extends BaseEntity {
  @Prop({ required: true, type: Types.ObjectId, ref: "User", unique: true })
  userId: Types.ObjectId;

  @Prop({ enum: BloodType })
  bloodType: BloodType;

  @Prop({ enum: MaritalStatus })
  maritalStatus: MaritalStatus;

  @Prop()
  religion: string;

  @Prop()
  placeOfBirth: string;

  @Prop()
  residentialAddress: string;

  @Prop()
  residentialAddressNotes: string;

  @Prop()
  citizenIdAddress: string;

  @Prop()
  citizenIdAddressNotes: string;

  @Prop()
  emergencyContactName: string;

  @Prop()
  emergencyContactPhone: string;

  @Prop()
  emergencyContactRelationship: string;

  @Prop({ required: true, unique: true })
  employeeNumber: string;

  @Prop({ required: true })
  hireDate: Date;

  @Prop({
    type: String,
    enum: EmploymentStatus,
    default: EmploymentStatus.ACTIVE,
  })
  employmentStatus: EmploymentStatus;

  @Prop({ enum: EmploymentType, default: EmploymentType.FULLTIME })
  employmentType: string;

  @Prop({ required: true, enum: Department })
  department: string;

  @Prop({ enum: JobRole })
  jobRole: string;

  @Prop({ enum: JobLevel })
  jobLevel: string;

  @Prop()
  lastClockedIn?: Date;

  @Prop()
  lastActive?: Date;

  @Prop()
  tags: string[];

  @Prop()
  terminationDate?: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

export const EmployeeSchemaFactory = () => {
  const employeeSchema = EmployeeSchema;

  employeeSchema.index({ userId: 1 }, { unique: true });
  employeeSchema.index({ employeeNumber: 1 }, { unique: true });
  employeeSchema.index({ employmentStatus: 1 });
  employeeSchema.index({ department: 1 });
  employeeSchema.index({ hireDate: 1 });
  employeeSchema.index({ jobRole: 1 });
  employeeSchema.index({ jobLevel: 1 });
  employeeSchema.index({ employmentType: 1 });

  // Virtual for full name (populated from User)
  employeeSchema.virtual("fullName", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
    get: function (user: { firstName?: string; lastName?: string }) {
      return user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "N/A";
    },
  });

  // Virtual for years of service
  employeeSchema.virtual("yearsOfService").get(function () {
    if (!this.hireDate) return null;
    const today = new Date();
    const startDate = new Date(this.hireDate);
    let years = today.getFullYear() - startDate.getFullYear();
    const monthDiff = today.getMonth() - startDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
      years--;
    }

    return years;
  });

  // Ensure virtuals are included in JSON output
  employeeSchema.set("toJSON", { virtuals: true });
  employeeSchema.set("toObject", { virtuals: true });

  return employeeSchema;
};
