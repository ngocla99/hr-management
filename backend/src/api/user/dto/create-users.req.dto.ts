import { ClassField } from "@/decorators/field.decorators";
import { CreateUserReqDto } from "./create-user.req.dto";

export class CreateUsersReqDto {
  @ClassField(() => CreateUserReqDto, {
    each: true,
  })
  users: CreateUserReqDto[];
}
