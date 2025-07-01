import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DepartmentDocument = HydratedDocument<Department>;

export enum DepartmentStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

@Schema({
  timestamps: true,
})
export class Department extends BaseEntity {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 100,
  })
  name: string;

  @Prop({
    maxlength: 500,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
  })
  manager: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: "Department",
  })
  parentDepartment: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  })
  employees: Types.ObjectId[];

  @Prop({
    type: Number,
    min: 0,
  })
  budget: number;

  @Prop({
    maxlength: 200,
  })
  location: string;

  @Prop({
    type: String,
    enum: DepartmentStatus,
    default: DepartmentStatus.ACTIVE,
  })
  status: DepartmentStatus;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
  })
  createdBy: Types.ObjectId;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);

export const DepartmentSchemaFactory = () => {
  const departmentSchema = DepartmentSchema;

  // Create indexes for optimized queries
  departmentSchema.index({ name: 1 });
  departmentSchema.index({ manager: 1 });
  departmentSchema.index({ parentDepartment: 1 });
  departmentSchema.index({ status: 1 });
  departmentSchema.index({ createdBy: 1 });
  departmentSchema.index({ createdAt: -1 });

  return departmentSchema;
};
