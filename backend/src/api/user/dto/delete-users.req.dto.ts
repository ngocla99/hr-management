import { StringField } from "@/decorators/field.decorators";

export class DeleteUsersReqDto {
  @StringField({
    example: ["1", "2", "3"],
    each: true,
  })
  ids: string[];
}
