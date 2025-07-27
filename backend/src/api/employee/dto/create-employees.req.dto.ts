import { ClassField } from "@/decorators/field.decorators";
import { CreateEmployeeReqDto } from "./create-employee.req.dto";

export class CreateEmployeesReqDto {
  @ClassField(() => CreateEmployeeReqDto, {
    each: true,
  })
  employees: CreateEmployeeReqDto[];
}
