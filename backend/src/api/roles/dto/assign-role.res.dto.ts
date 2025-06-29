import { UserRole } from "@/constants/roles.constant";
import { DateField, EnumField, UUIDField } from "@/decorators/field.decorators";
import { Expose } from "class-transformer";

export class AssignRoleResDto {
  @UUIDField({
    description: "ID of user who assigned the role",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  userId: string;

  @EnumField(() => UserRole, {
    description: "Previous role",
    example: UserRole.EMPLOYEE,
  })
  @Expose()
  previousRole: UserRole;

  @EnumField(() => UserRole, {
    description: "New assigned role",
    example: UserRole.RECRUITER,
  })
  @Expose()
  newRole: UserRole;

  @UUIDField({
    description: "ID of user who assigned the role",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  assignedBy: string;

  @DateField({
    description: "When the role was assigned",
    example: "2024-12-01T10:00:00Z",
  })
  @Expose()
  assignedAt: Date;
}
