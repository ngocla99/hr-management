import { NumberField, StringField } from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class LoginResDto {
  @Expose()
  @StringField({
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  userId!: string;

  @Expose()
  @StringField({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjI5YjUyNzZjYTAzZmZkMGQ0YzM4ZSIsInJvbGUiOiJlbXBsb3llZSIsInNlc3Npb25JZCI6IjY4NjI5ZDBlODJmNmU5MzUyYzAxOGUwYyIsImlhdCI6MTc1MTI5MzE5OCwiZXhwIjoxNzUxMzc5NTk4fQ.KOWmVWmPpQe3YdxXh_E7HCeQSarb137RiQkz_y25q-I",
  })
  accessToken!: string;

  @Expose()
  @StringField({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2ODYyOWQwZTgyZjZlOTM1MmMwMThlMGMiLCJoYXNoIjoiMjZiZjhlMGViNjcyNjQzODY0NWQ3NTI3MjU3NTRmODhmNzhmZDNlOTUyNzdhMTA4NWRhYjRmNjQ0YzFmZjAzOCIsImlhdCI6MTc1MTI5MzE5OCwiZXhwIjoxNzgyODI5MTk4fQ.VplQnryrTzsmd3jOnppA9sLTrmFB6kgOF-V0enxD67Y",
  })
  refreshToken!: string;

  @Expose()
  @NumberField({
    example: 1751379598427,
  })
  tokenExpires!: number;
}
