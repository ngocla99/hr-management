import { DepartmentStatus } from "@/api/organization/entities/department.entity";
import { OffsetPageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import {
  EnumFieldOptional,
  StringFieldOptional,
  UUIDFieldOptional,
} from "@/decorators/field.decorators";

export class ListDepartmentsReqDto extends OffsetPageOptionsDto {
  @StringFieldOptional({
    description: "Search departments by name",
    example: "Engineering",
  })
  search?: string;

  @EnumFieldOptional(() => DepartmentStatus, {
    description: "Filter by department status",
    example: DepartmentStatus.ACTIVE,
  })
  status?: DepartmentStatus;

  @UUIDFieldOptional({
    description: "Filter by parent department ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  parentDepartment?: string;

  @UUIDFieldOptional({
    description: "Filter by department manager ID",
    example: "60b5f8c2e4b0a12b8c2e4b0b",
  })
  manager?: string;
}
