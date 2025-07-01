import { DepartmentStatus } from "@/api/organization/entities/department.entity";
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringField,
  StringFieldOptional,
  UUIDFieldOptional,
} from "@/decorators/field.decorators";

export class CreateDepartmentReqDto {
  @StringField({
    description: "Department name",
    example: "Engineering",
    minLength: 2,
    maxLength: 100,
  })
  name: string;

  @StringFieldOptional({
    description: "Department description",
    example: "Software development and engineering team",
    maxLength: 500,
  })
  description?: string;

  @UUIDFieldOptional({
    description: "Department manager user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  manager?: string;

  @UUIDFieldOptional({
    description: "Parent department ID",
    example: "60b5f8c2e4b0a12b8c2e4b0b",
  })
  parentDepartment?: string;

  @NumberFieldOptional({
    description: "Department budget",
    example: 50000,
    minimum: 0,
  })
  budget?: number;

  @StringFieldOptional({
    description: "Department location",
    example: "New York Office, Floor 3",
    maxLength: 200,
  })
  location?: string;

  @EnumFieldOptional(() => DepartmentStatus, {
    description: "Department status",
    example: DepartmentStatus.ACTIVE,
  })
  status?: DepartmentStatus;
}
