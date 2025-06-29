/* eslint-disable */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { promises as fs } from "fs";
import { Types } from "mongoose";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { FileListResDto } from "./dto/file-list.res.dto";
import { FileResDto } from "./dto/file.res.dto";
import { UploadFileReqDto } from "./dto/upload-file.req.dto";
import { FileDocument } from "./entities/file.entity";
import { FilesRepository } from "./file.repository";

@Injectable()
export class FilesService {
  private readonly uploadDir: string;
  private readonly maxFileSize: number;
  private readonly allowedMimeTypes: string[];

  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly configService: ConfigService,
  ) {
    this.uploadDir = this.configService.get<string>("app.uploadDir", "uploads");
    this.maxFileSize = this.configService.get<number>("app.maxFileSize", 10 * 1024 * 1024); // 10MB
    this.allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain",
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
  }

  async uploadFile(file: any, uploadDto: UploadFileReqDto, userId: string): Promise<FileResDto> {
    // Validate file
    this.validateFile(file);

    // Ensure upload directory exists
    await this.ensureUploadDir();

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const filename = `${Date.now()}_${uuidv4()}${fileExtension}`;
    const filepath = path.join(this.uploadDir, filename);

    try {
      // Save file to disk
      await fs.writeFile(filepath, file.buffer);

      // Save file metadata to database
      const fileData = {
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: filepath,
        url: `/api/files/${filename}`,
        storage: "local",
        uploadedBy: new Types.ObjectId(userId),
        tags: uploadDto.tags,
        metadata: uploadDto.metadata,
        expiresAt: uploadDto.expiresAt ? new Date(uploadDto.expiresAt) : undefined,
      };

      const savedFile = await this.filesRepository.create(fileData);
      return this.mapToResponseDto(savedFile);
    } catch (error) {
      // Clean up file if database save fails
      try {
        await fs.unlink(filepath);
      } catch (unlinkError) {
        console.error("Failed to clean up file:", unlinkError);
      }
      throw error;
    }
  }

  async getFile(id: string, userId?: string): Promise<FileDocument> {
    const file = await this.filesRepository.findById(id);

    if (!file) {
      throw new NotFoundException("File not found");
    }

    if (file.status === "deleted") {
      throw new NotFoundException("File not found");
    }

    // Check if file has expired
    if (file.expiresAt && file.expiresAt < new Date()) {
      throw new NotFoundException("File has expired");
    }

    // If userId is provided, check ownership
    if (userId && file.uploadedBy.toString() !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return file;
  }

  async getFileBuffer(id: string, userId?: string): Promise<Buffer> {
    const file = await this.getFile(id, userId);

    try {
      return await fs.readFile(file.path);
    } catch (error) {
      throw new NotFoundException("File content not found");
    }
  }

  async getUserFiles(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<FileListResDto> {
    const skip = (page - 1) * limit;

    const [files, total, totalSize] = await Promise.all([
      this.filesRepository.findByUser(userId, limit, skip),
      this.filesRepository.countByUser(userId),
      this.filesRepository.getTotalSizeByUser(userId),
    ]);

    return {
      files: files.map((file) => this.mapToResponseDto(file)),
      total,
      page,
      limit,
      totalSize,
    };
  }

  async deleteFile(id: string, userId: string): Promise<void> {
    const file = await this.filesRepository.findByIdAndUser(id, userId);

    if (!file) {
      throw new NotFoundException("File not found");
    }

    // Soft delete in database
    await this.filesRepository.softDelete(id);

    // Optional: Delete physical file immediately or schedule for cleanup
    try {
      await fs.unlink(file.path);
    } catch (error) {
      console.error("Failed to delete physical file:", error);
      // Don't throw error here as the database record is already marked as deleted
    }
  }

  async updateFile(
    id: string,
    updateData: Partial<UploadFileReqDto>,
    userId: string,
  ): Promise<FileResDto> {
    const file = await this.filesRepository.findByIdAndUser(id, userId);

    if (!file) {
      throw new NotFoundException("File not found");
    }

    const updatedFile = await this.filesRepository.updateById(id, {
      tags: updateData.tags,
      metadata: updateData.metadata ? JSON.parse(updateData.metadata) : undefined,
      expiresAt: updateData.expiresAt ? new Date(updateData.expiresAt) : undefined,
    });

    return this.mapToResponseDto(updatedFile!);
  }

  async cleanupExpiredFiles(): Promise<void> {
    const expiredFiles = await this.filesRepository.findExpiredFiles();

    for (const file of expiredFiles) {
      try {
        // Delete physical file
        await fs.unlink(file.path);

        // Hard delete from database
        await this.filesRepository.hardDelete(String(file._id));
      } catch (error) {
        console.error(`Failed to cleanup expired file ${String(file._id)}:`, error);
      }
    }
  }

  private validateFile(file: any): void {
    if (!file) {
      throw new BadRequestException("No file provided");
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File size too large. Maximum size is ${this.maxFileSize / (1024 * 1024)}MB`,
      );
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type not allowed. Allowed types: ${this.allowedMimeTypes.join(", ")}`,
      );
    }
  }

  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  private mapToResponseDto(file: FileDocument): FileResDto {
    return plainToInstance(FileResDto, {
      id: file.id,
      originalName: file.originalName,
      filename: file.filename,
      mimeType: file.mimeType,
      size: file.size,
      url: file.url!,
      storage: file.storage,
      tags: file.tags,
      metadata: file.metadata,
      createdAt: file.createdAt,
      expiresAt: file.expiresAt,
    });
  }
}
