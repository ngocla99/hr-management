import { StringField } from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RegisterResDto {
  @Expose()
  @StringField({
    example: "68629cf94132fa68bd9aef49",
  })
  userId!: string;
}
