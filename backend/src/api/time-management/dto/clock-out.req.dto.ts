import { StringFieldOptional } from "@/decorators/field.decorators";

export class ClockOutReqDto {
  @StringFieldOptional({
    description: "Additional notes",
    example: "Completed all tasks for today",
  })
  notes?: string;
}
