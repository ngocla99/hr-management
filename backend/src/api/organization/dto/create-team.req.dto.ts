import { TeamStatus } from "@/api/organization/entities/team.entity";
import { EnumFieldOptional, StringField, StringFieldOptional } from "@/decorators/field.decorators";

export class CreateTeamReqDto {
  @StringField({
    description: "Team name",
    example: "Frontend Development Team",
    minLength: 2,
    maxLength: 100,
  })
  name: string;

  @StringFieldOptional({
    description: "Team description",
    example: "Frontend development and UI/UX implementation",
    maxLength: 500,
  })
  description?: string;

  @StringField({
    description: "Department ID where the team belongs",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  department: string;

  @StringFieldOptional({
    description: "Team lead user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0b",
  })
  teamLead?: string;

  @EnumFieldOptional(() => TeamStatus, {
    description: "Team status",
    example: TeamStatus.ACTIVE,
  })
  status?: TeamStatus;
}
