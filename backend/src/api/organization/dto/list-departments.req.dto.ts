import { DepartmentStatus } from "@/api/organization/entities/department.entity";
import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import { EnumFieldOptional, StringFieldOptional } from "@/decorators/field.decorators";

export class ListDepartmentsReqDto extends PageOptionsDto {
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

  @StringFieldOptional({
    description: "Filter by parent department ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  parentDepartment?: string;

  @StringFieldOptional({
    description: "Filter by department manager ID",
    example: "60b5f8c2e4b0a12b8c2e4b0b",
  })
  manager?: string;
}
