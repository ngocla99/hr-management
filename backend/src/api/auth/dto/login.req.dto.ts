import { EmailField, PasswordField } from "@/decorators/field.decorators";

export class LoginReqDto {
  @EmailField({
    example: "nemo@gmail.com",
  })
  email!: string;

  @PasswordField({
    example: "Qwer1234!@#$",
  })
  password!: string;
}
