import { DepartmentStatus } from "@/api/organization/entities/department.entity";
import {
  DateField,
  EnumField,
  NumberFieldOptional,
  StringField,
  StringFieldOptional,
  UUIDField,
  UUIDFieldOptional,
} from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class DepartmentResDto {
  @StringField({
    description: "Department ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  id: string;

  @StringField({
    description: "Department name",
    example: "Engineering",
  })
  @Expose()
  name: string;

  @StringFieldOptional({
    description: "Department description",
    example: "Software development and engineering team",
  })
  @Expose()
  description?: string;

  @UUIDFieldOptional({
    description: "Department manager user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0b",
  })
  @Expose()
  manager?: string;

  @UUIDFieldOptional({
    description: "Parent department ID",
    example: "60b5f8c2e4b0a12b8c2e4b0c",
  })
  @Expose()
  parentDepartment?: string;

  @NumberFieldOptional({
    description: "Department budget",
    example: 50000,
  })
  @Expose()
  budget?: number;

  @StringFieldOptional({
    description: "Department location",
    example: "New York Office, Floor 3",
  })
  @Expose()
  location?: string;

  @EnumField(() => DepartmentStatus, {
    description: "Department status",
    example: DepartmentStatus.ACTIVE,
  })
  @Expose()
  status: DepartmentStatus;

  @UUIDField({
    description: "ID of user who created the department",
    example: "60b5f8c2e4b0a12b8c2e4b0d",
  })
  @Expose()
  createdBy: string;

  @DateField({
    description: "Department creation date",
    example: "2023-12-01T10:00:00Z",
  })
  @Expose()
  createdAt: Date;

  @DateField({
    description: "Department last update date",
    example: "2023-12-01T10:00:00Z",
  })
  @Expose()
  updatedAt: Date;
}
