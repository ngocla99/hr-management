import { UUIDField } from "@/decorators/field.decorators";

export class AddTeamMemberReqDto {
  @UUIDField({
    description: "User ID to add to the team",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  userId: string;
}
