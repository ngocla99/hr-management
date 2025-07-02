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

export class DepartmentResDto {
  @StringField({
    description: "Department ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  id: string;

  @StringField({
    description: "Department name",
    example: "Engineering",
  })
  name: string;

  @StringFieldOptional({
    description: "Department description",
    example: "Software development and engineering team",
  })
  description?: string;

  @UUIDFieldOptional({
    description: "Department manager user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0b",
  })
  manager?: string;

  @UUIDFieldOptional({
    description: "Parent department ID",
    example: "60b5f8c2e4b0a12b8c2e4b0c",
  })
  parentDepartment?: string;

  @NumberFieldOptional({
    description: "Department budget",
    example: 50000,
  })
  budget?: number;

  @StringFieldOptional({
    description: "Department location",
    example: "New York Office, Floor 3",
  })
  location?: string;

  @EnumField(() => DepartmentStatus, {
    description: "Department status",
    example: DepartmentStatus.ACTIVE,
  })
  status: DepartmentStatus;

  @UUIDField({
    description: "ID of user who created the department",
    example: "60b5f8c2e4b0a12b8c2e4b0d",
  })
  createdBy: string;

  @DateField({
    description: "Department creation date",
    example: "2023-12-01T10:00:00Z",
  })
  createdAt: Date;

  @DateField({
    description: "Department last update date",
    example: "2023-12-01T10:00:00Z",
  })
  updatedAt: Date;
}
