import { EmailField, PasswordField, StringFieldOptional } from "@/decorators/field.decorators";

export class RegisterReqDto {
  @StringFieldOptional({
    example: "nemo",
  })
  username: string;

  @EmailField({
    example: "nemo@gmail.com",
  })
  email!: string;

  @PasswordField({
    example: "Qwer1234!@#$",
  })
  password!: string;
}
