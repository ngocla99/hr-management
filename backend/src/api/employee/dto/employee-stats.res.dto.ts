import { NumberField } from "@/decorators/field.decorators";

export class EmployeeStatsDto {
  @NumberField({
    description: "Total number of active employees",
    example: 150,
  })
  active: number;

  @NumberField({
    description: "Total number of inactive employees",
    example: 25,
  })
  onLeave: number;

  @NumberField({
    description: "Total number of suspended employees",
    example: 5,
  })
  terminated: number;

  @NumberField({
    description: "Total number of unverified employees",
    example: 10,
  })
  probation: number;

  @NumberField({
    description: "Total number of all employees",
    example: 190,
  })
  total: number;
}
