import { StringFieldOptional } from "@/decorators/field.decorators";

export class ClockInReqDto {
  @StringFieldOptional({
    description: "Additional notes",
    example: "Working from office today",
  })
  notes?: string;
}
