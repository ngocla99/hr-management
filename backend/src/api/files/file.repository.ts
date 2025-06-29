import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateFileReqDto } from "./dto/create-file.req.dto";
import { File, FileDocument } from "./entities/file.entity";

@Injectable()
export class FilesRepository {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  async create(fileData: CreateFileReqDto): Promise<FileDocument> {
    const file = new this.fileModel(fileData);
    return file.save();
  }

  async findById(id: string): Promise<FileDocument | null> {
    return this.fileModel.findById(id).exec();
  }

  async findByIdAndUser(id: string, userId: string): Promise<FileDocument | null> {
    return this.fileModel
      .findOne({
        _id: id,
        uploadedBy: new Types.ObjectId(userId),
        status: "active",
      })
      .exec();
  }

  async findByUser(userId: string, limit: number = 10, skip: number = 0): Promise<FileDocument[]> {
    return this.fileModel
      .find({
        uploadedBy: new Types.ObjectId(userId),
        status: "active",
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async updateById(id: string, updateData: Partial<File>): Promise<FileDocument | null> {
    return this.fileModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async softDelete(id: string): Promise<FileDocument | null> {
    return this.fileModel.findByIdAndUpdate(id, { status: "deleted" }, { new: true }).exec();
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await this.fileModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findExpiredFiles(): Promise<FileDocument[]> {
    return this.fileModel
      .find({
        expiresAt: { $lte: new Date() },
        status: "active",
      })
      .exec();
  }

  async countByUser(userId: string): Promise<number> {
    return this.fileModel
      .countDocuments({
        uploadedBy: new Types.ObjectId(userId),
        status: "active",
      })
      .exec();
  }

  async getTotalSizeByUser(userId: string): Promise<number> {
    const result = await this.fileModel
      .aggregate([
        {
          $match: {
            uploadedBy: new Types.ObjectId(userId),
            status: "active",
          },
        },
        {
          $group: {
            _id: null,
            totalSize: { $sum: "$size" },
          },
        },
      ])
      .exec();

    return result.length > 0 ? (result[0] as { totalSize: number }).totalSize : 0;
  }
}
