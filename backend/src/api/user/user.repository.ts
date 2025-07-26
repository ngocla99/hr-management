import { UserRole } from "@/constants/roles.constant";
import { applyMongoQueryOptions } from "@/utils/build-query-options";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DeleteResult, Model, Types } from "mongoose";
import { CreateUserReqDto } from "./dto/create-user.req.dto";
import { UpdateUserReqDto } from "./dto/update-user.req.dto";
import { UserDocument, UserStatus } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(@InjectModel("User") public readonly userModel: Model<UserDocument>) {}

  async findById(id: string | Types.ObjectId): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string, options?: { select?: string[] }): Promise<UserDocument | null> {
    const query = this.userModel.findOne({ email, deletedAt: null });
    return applyMongoQueryOptions(query, options).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username, deletedAt: null }).exec();
  }

  async findOne(filter?: Record<string, any>): Promise<UserDocument | null> {
    return this.userModel.findOne({ deletedAt: null, ...filter }).exec();
  }

  async findPreviousOne(filter?: Record<string, any>): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ deletedAt: null, ...filter })
      .sort({ createdAt: -1 })
      .exec();

    if (!user)
      return await this.userModel.findOne({ deletedAt: null }).sort({ createdAt: -1 }).exec();

    return user;
  }

  async findNextOne(filter?: Record<string, any>): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ deletedAt: null, ...filter })
      .sort({ createdAt: 1 })
      .exec();

    if (!user)
      return await this.userModel.findOne({ deletedAt: null }).sort({ createdAt: 1 }).exec();

    return user;
  }

  async countDocuments(filter?: Record<string, any>): Promise<number> {
    return this.userModel.countDocuments({ deletedAt: null, ...filter });
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username, deletedAt: null }).exec();
    return !!user;
  }

  async createUser(data: CreateUserReqDto): Promise<UserDocument> {
    const user = new this.userModel(data);
    await user.save();
    return user;
  }

  async updateUser(id: string, data: UpdateUserReqDto): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async softDeleteUser(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).exec();
  }

  async hardDeleteUser(id: string): Promise<DeleteResult> {
    return this.userModel.deleteOne({ _id: id });
  }

  async hardDeleteManyUsers(ids: string[]): Promise<DeleteResult> {
    return this.userModel.deleteMany({ _id: { $in: ids } });
  }

  async findAllActive(): Promise<UserDocument[]> {
    return this.userModel.find({ deletedAt: null }).exec();
  }

  async updateById(id: string, data: Partial<UserDocument>): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async findByRole(role: UserRole): Promise<UserDocument[]> {
    return this.userModel.find({ role, deletedAt: null }).exec();
  }

  async suspendUser(id: string): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, { status: UserStatus.SUSPENDED }, { new: true })
      .exec();
  }

  async activateUser(id: string): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, { status: UserStatus.ACTIVE }, { new: true })
      .exec();
  }

  async getUserStats(filter: Record<string, any>) {
    const query = { deletedAt: null, ...filter };
    const [totalActive, totalInactive, totalSuspended, totalUnverified] = await Promise.all([
      this.userModel.countDocuments({ status: UserStatus.ACTIVE, ...query }).exec(),
      this.userModel.countDocuments({ status: UserStatus.INACTIVE, ...query }).exec(),
      this.userModel.countDocuments({ status: UserStatus.SUSPENDED, ...query }).exec(),
      this.userModel.countDocuments({ status: UserStatus.NOT_VERIFIED, ...query }).exec(),
    ]);

    return {
      totalActive,
      totalInactive,
      totalSuspended,
      totalUnverified,
    };
  }
}
