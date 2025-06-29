import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { File, FileSchema } from "./entities/file.entity";
import { FilesController } from "./file.controller";
import { FilesRepository } from "./file.repository";
import { FilesService } from "./file.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: File.name, schema: FileSchema }])],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
  exports: [FilesService, FilesRepository],
})
export class FilesModule {}
