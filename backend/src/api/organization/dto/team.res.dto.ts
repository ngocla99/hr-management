import { TeamStatus } from "@/api/organization/entities/team.entity";
import {
  DateField,
  EnumField,
  StringField,
  StringFieldOptional,
  UUIDField,
  UUIDFieldOptional,
} from "@/decorators/field.decorators";

export class TeamResDto {
  @UUIDField({
    description: "Team ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  id: string;

  @StringField({
    description: "Team name",
    example: "Frontend Development Team",
  })
  name: string;

  @StringFieldOptional({
    description: "Team description",
    example: "Frontend development and UI/UX implementation",
  })
  description?: string;

  @UUIDField({
    description: "Department ID where the team belongs",
    example: "60b5f8c2e4b0a12b8c2e4b0b",
  })
  department: string;

  @UUIDFieldOptional({
    description: "Team lead user ID",
    example: "60b5f8c2e4b0a12b8c2e4b0c",
  })
  teamLead?: string;

  @EnumField(() => TeamStatus, {
    description: "Team status",
    example: TeamStatus.ACTIVE,
  })
  status: TeamStatus;

  @UUIDField({
    description: "ID of user who created the team",
    example: "60b5f8c2e4b0a12b8c2e4b0d",
  })
  createdBy: string;

  @DateField({
    description: "Team creation date",
    example: "2023-12-01T10:00:00Z",
  })
  createdAt: Date;

  @DateField({
    description: "Team last update date",
    example: "2023-12-01T10:00:00Z",
  })
  updatedAt: Date;
}
