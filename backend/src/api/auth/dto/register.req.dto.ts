import { EmailField, PasswordField, StringFieldOptional } from "@/decorators/field.decorators";

export class RegisterReqDto {
  @StringFieldOptional()
  username: string;

  @EmailField()
  email!: string;

  @PasswordField()
  password!: string;
}
