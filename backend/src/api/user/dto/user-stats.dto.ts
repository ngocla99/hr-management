import { NumberField } from "@/decorators/field.decorators";

export class UserStatsDto {
  @NumberField({
    description: "Total number of active users",
    example: 150,
  })
  active: number;

  @NumberField({
    description: "Total number of inactive users",
    example: 25,
  })
  inactive: number;

  @NumberField({
    description: "Total number of suspended users",
    example: 5,
  })
  suspended: number;

  @NumberField({
    description: "Total number of unverified users",
    example: 10,
  })
  unverified: number;

  @NumberField({
    description: "Total number of all users",
    example: 190,
  })
  total: number;

  constructor(active: number, inactive: number, suspended: number, unverified: number) {
    this.active = active;
    this.inactive = inactive;
    this.suspended = suspended;
    this.unverified = unverified;
    this.total = active + inactive + suspended + unverified;
  }
}
