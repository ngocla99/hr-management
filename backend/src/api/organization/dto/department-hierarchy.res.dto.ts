import { DepartmentStatus } from "@/api/organization/entities/department.entity";
import {
  ClassField,
  EnumField,
  NumberFieldOptional,
  StringField,
  StringFieldOptional,
} from "@/decorators/field.decorators";

export class DepartmentHierarchyResDto {
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

  @StringFieldOptional({
    description: "Department manager user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0b",
  })
  manager?: string;

  @StringFieldOptional({
    description: "Manager's full name",
    example: "John Doe",
  })
  managerName?: string;

  @NumberFieldOptional({
    description: "Number of employees in this department",
    example: 25,
  })
  employeeCount?: number;

  @NumberFieldOptional({
    description: "Number of teams in this department",
    example: 3,
  })
  teamCount?: number;

  @EnumField(() => DepartmentStatus, {
    description: "Department status",
    example: DepartmentStatus.ACTIVE,
  })
  status: DepartmentStatus;

  @ClassField(() => DepartmentHierarchyResDto, {
    description: "Child departments",
    isArray: true,
  })
  children: DepartmentHierarchyResDto[];
}
