import { ClassField, ClassFieldOptional, NumberField } from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";
import { UserResDto } from "./user.res.dto";

export class CurrentUserResDto {
  @ClassField(() => UserResDto, {
    description: "User",
  })
  @Expose()
  user: UserResDto;
  @NumberField({
    description: "Position",
  })
  @Expose()
  position: number;
}

@Exclude()
export class UserAdjacentResDto {
  @ClassField(() => CurrentUserResDto, {
    description: "Current user",
  })
  @Expose()
  current: CurrentUserResDto;

  @ClassFieldOptional(() => UserResDto, {
    description: "Previous user",
  })
  @Expose()
  previous: UserResDto;
  @ClassFieldOptional(() => UserResDto, {
    description: "Next user",
  })
  @Expose()
  next: UserResDto;

  @NumberField({
    description: "Total number of users",
  })
  @Expose()
  total: number;
}
