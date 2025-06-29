import { Permission } from "@/constants/roles.constant";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { ApiAuth, ApiPublic } from "@/decorators/http.decorators";
import { RequirePermission } from "@/decorators/roles.decorator";
import { RolesGuard } from "@/guards/roles.guard";
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { FileListResDto } from "./dto/file-list.res.dto";
import { FileResDto } from "./dto/file.res.dto";
import { UploadFileReqDto } from "./dto/upload-file.req.dto";
import { FilesService } from "./file.service";

@ApiTags("files")
@Controller({
  path: "files",
  version: "1",
})
@UseGuards(RolesGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("upload")
  @ApiAuth({
    type: FileResDto,
    summary: "Upload a file",
    statusCode: HttpStatus.CREATED,
  })
  @ApiConsumes("multipart/form-data")
  @RequirePermission(Permission.UPLOAD_FILE)
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: any,
    @Body() uploadDto: UploadFileReqDto,
    @CurrentUser("id") userId: string,
  ): Promise<FileResDto> {
    return this.filesService.uploadFile(file, uploadDto, userId);
  }

  @Get()
  @ApiAuth({
    type: FileListResDto,
    summary: "Get user files with pagination",
    isPaginated: true,
  })
  async getUserFiles(
    @CurrentUser("id") userId: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<FileListResDto> {
    return this.filesService.getUserFiles(userId, page, limit);
  }

  @Get(":id")
  @ApiPublic({
    type: FileResDto,
    summary: "Get file details",
  })
  @ApiParam({ name: "id", type: "String" })
  async getFileDetails(
    @Param("id") id: string,
    @CurrentUser("id") userId?: string,
  ): Promise<FileResDto> {
    const file = await this.filesService.getFile(id, userId);
    return {
      id: file.id,
      originalName: file.originalName,
      filename: file.filename,
      mimeType: file.mimeType,
      size: file.size,
      url: file.url!,
      storage: file.storage,
      tags: file.tags,
      metadata: file.metadata,
      expiresAt: file.expiresAt,
      createdAt: file.createdAt,
    };
  }

  @Get(":id/download")
  @ApiPublic({
    summary: "Download a file",
  })
  @ApiParam({ name: "id", type: "String" })
  async downloadFile(
    @Param("id") id: string,
    @Res() res: Response,
    @CurrentUser("id") userId?: string,
  ): Promise<void> {
    const file = await this.filesService.getFile(id, userId);
    const buffer = await this.filesService.getFileBuffer(id, userId);

    res.set({
      "Content-Type": file.mimeType,
      "Content-Disposition": `attachment; filename="${file.originalName}"`,
      "Content-Length": file.size.toString(),
    });

    res.send(buffer);
  }

  @Get(":id/stream")
  @ApiPublic({
    summary: "Stream a file (for viewing in browser)",
  })
  @ApiParam({ name: "id", type: "String" })
  async streamFile(
    @Param("id") id: string,
    @Res() res: Response,
    @CurrentUser("id") userId?: string,
  ): Promise<void> {
    const file = await this.filesService.getFile(id, userId);
    const buffer = await this.filesService.getFileBuffer(id, userId);

    res.set({
      "Content-Type": file.mimeType,
      "Content-Disposition": `inline; filename="${file.originalName}"`,
      "Content-Length": file.size.toString(),
    });

    res.send(buffer);
  }

  @Put(":id")
  @ApiAuth({
    type: FileResDto,
    summary: "Update file metadata",
  })
  @ApiParam({ name: "id", type: "String" })
  async updateFile(
    @Param("id") id: string,
    @Body() updateDto: UploadFileReqDto,
    @CurrentUser("id") userId: string,
  ): Promise<FileResDto> {
    return this.filesService.updateFile(id, updateDto, userId);
  }

  @Delete(":id")
  @ApiAuth({
    summary: "Delete a file",
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: "id", type: "String" })
  @RequirePermission(Permission.DELETE_FILE)
  async deleteFile(@Param("id") id: string, @CurrentUser("id") userId: string): Promise<void> {
    await this.filesService.deleteFile(id, userId);
  }
}
