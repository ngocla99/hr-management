import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { FilesModule } from "./files/file.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule, AuthModule, FilesModule],
})
export class ApiModule {}
