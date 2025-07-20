import { NumberField } from "@/decorators/field.decorators";

export class UserStatsDto {
  @NumberField({
    description: "Total number of active users",
    example: 150,
  })
  totalActive: number;

  @NumberField({
    description: "Total number of inactive users",
    example: 25,
  })
  totalInactive: number;

  @NumberField({
    description: "Total number of suspended users",
    example: 5,
  })
  totalSuspended: number;

  @NumberField({
    description: "Total number of unverified users",
    example: 10,
  })
  totalUnverified: number;

  @NumberField({
    description: "Total number of all users",
    example: 190,
  })
  total: number;

  constructor(
    totalActive: number,
    totalInactive: number,
    totalSuspended: number,
    totalUnverified: number,
  ) {
    this.totalActive = totalActive;
    this.totalInactive = totalInactive;
    this.totalSuspended = totalSuspended;
    this.totalUnverified = totalUnverified;
    this.total = totalActive + totalInactive + totalSuspended + totalUnverified;
  }
}
