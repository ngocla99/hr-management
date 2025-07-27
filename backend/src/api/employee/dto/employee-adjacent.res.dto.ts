import { ClassField, ClassFieldOptional, NumberField } from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";
import { EmployeeResDto } from "./employee.res.dto";

export class CurrentEmployeeResDto {
  @ClassField(() => EmployeeResDto, {
    description: "User",
  })
  @Expose()
  employee: EmployeeResDto;
  @NumberField({
    description: "Position",
  })
  @Expose()
  position: number;
}

@Exclude()
export class EmployeeAdjacentResDto {
  @ClassField(() => CurrentEmployeeResDto, {
    description: "Current user",
  })
  @Expose()
  current: CurrentEmployeeResDto;

  @ClassFieldOptional(() => EmployeeResDto, {
    description: "Previous user",
  })
  @Expose()
  previous: EmployeeResDto;
  @ClassFieldOptional(() => EmployeeResDto, {
    description: "Next user",
  })
  @Expose()
  next: EmployeeResDto;

  @NumberField({
    description: "Total number of users",
  })
  @Expose()
  total: number;
}
