import { DepartmentStatus } from "@/api/organization/entities/department.entity";
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringField,
  StringFieldOptional,
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

  @StringFieldOptional({
    description: "Department manager user ID",
    example: "68629b5276ca03ffd0d4c38e",
  })
  manager?: string;

  @StringFieldOptional({
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
    example: "Ha Noi, Viet Nam",
    maxLength: 200,
  })
  location?: string;

  @EnumFieldOptional(() => DepartmentStatus, {
    description: "Department status",
    example: DepartmentStatus.ACTIVE,
  })
  status?: DepartmentStatus;
}
