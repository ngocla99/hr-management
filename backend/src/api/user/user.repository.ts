import { UserRole } from "@/constants/roles.constant";
import { applyMongoQueryOptions } from "@/utils/build-query-options";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DeleteResult, Model, Types } from "mongoose";
import { CreateUserReqDto } from "./dto/create-user.req.dto";
import { UpdateUserReqDto } from "./dto/update-user.req.dto";
import { User, UserDocument, UserStatus } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) public readonly model: Model<UserDocument>) {}

  async findById(id: string | Types.ObjectId): Promise<UserDocument | null> {
    return this.model.findById(id).exec();
  }

  async findByEmail(email: string, options?: { select?: string[] }): Promise<UserDocument | null> {
    const query = this.model.findOne({ email, deletedAt: null });
    return applyMongoQueryOptions(query, options).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.model.findOne({ username, deletedAt: null }).exec();
  }

  async findOne(filter?: Record<string, any>): Promise<UserDocument | null> {
    return this.model.findOne({ deletedAt: null, ...filter }).exec();
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.model.findOne({ username, deletedAt: null }).exec();
    return !!user;
  }

  async createUser(data: CreateUserReqDto): Promise<UserDocument> {
    const user = new this.model(data);
    await user.save();
    return user;
  }

  async updateUser(id: string, data: UpdateUserReqDto): Promise<UserDocument | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async softDeleteUser(id: string): Promise<UserDocument | null> {
    return this.model.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).exec();
  }

  async hardDeleteUser(id: string): Promise<DeleteResult> {
    return this.model.deleteOne({ _id: id });
  }

  async hardDeleteManyUsers(ids: string[]): Promise<DeleteResult> {
    return this.model.deleteMany({ _id: { $in: ids } });
  }

  async findAllActive(): Promise<UserDocument[]> {
    return this.model.find({ deletedAt: null }).exec();
  }

  async updateById(id: string, data: Partial<UserDocument>): Promise<UserDocument | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async findByRole(role: UserRole): Promise<UserDocument[]> {
    return this.model.find({ role, deletedAt: null }).exec();
  }

  async suspendUser(id: string): Promise<UserDocument | null> {
    return this.model.findByIdAndUpdate(id, { status: UserStatus.SUSPENDED }, { new: true }).exec();
  }

  async activateUser(id: string): Promise<UserDocument | null> {
    return this.model.findByIdAndUpdate(id, { status: UserStatus.ACTIVE }, { new: true }).exec();
  }

  async getUserStats(filter: Record<string, any>) {
    const query = { deletedAt: null, ...filter };
    const [active, inactive, suspended, unverified] = await Promise.all([
      this.model.countDocuments({ status: UserStatus.ACTIVE, ...query }).exec(),
      this.model.countDocuments({ status: UserStatus.INACTIVE, ...query }).exec(),
      this.model.countDocuments({ status: UserStatus.SUSPENDED, ...query }).exec(),
      this.model.countDocuments({ status: UserStatus.NOT_VERIFIED, ...query }).exec(),
    ]);

    return {
      active,
      inactive,
      suspended,
      unverified,
    };
  }
}
