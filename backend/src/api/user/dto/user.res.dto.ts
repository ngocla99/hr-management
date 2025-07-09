import { UserRole } from "@/constants/roles.constant";
import { ClassField, StringField, StringFieldOptional } from "@/decorators/field.decorators";
import { Exclude, Expose, Transform } from "class-transformer";
import { UserDocument } from "../entities/user.entity";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

@Exclude()
export class UserResDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  username: string;

  @StringField()
  @Expose()
  email: string;

  @StringField()
  @Expose()
  role: UserRole;

  @StringFieldOptional()
  @Expose()
  bio?: string;

  @StringField()
  @Expose()
  image: string;

  @StringField()
  @Expose()
  @Transform(
    ({ obj }: { obj: UserDocument }) => (obj.deletedAt ? UserStatus.SUSPENDED : UserStatus.ACTIVE),
    {
      toClassOnly: true,
    },
  )
  status: UserStatus;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}
