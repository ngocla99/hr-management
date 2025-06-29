import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import { Model, Types } from "mongoose";
import { CreateUserReqDto } from "./dto/create-user.req.dto";
import { UpdateUserReqDto } from "./dto/update-user.req.dto";
import { UserResDto } from "./dto/user.res.dto";
import { UserDocument } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(@InjectModel("User") public readonly userModel: Model<UserDocument>) {}

  async findById(id: string | Types.ObjectId): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email, deletedAt: null }).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username, deletedAt: null }).exec();
  }

  async createUser(data: CreateUserReqDto): Promise<UserResDto> {
    const user = new this.userModel(data);
    await user.save();
    return plainToInstance(UserResDto, user);
  }

  async updateUser(id: string, data: UpdateUserReqDto): Promise<UserResDto | null> {
    const user = await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return plainToInstance(UserResDto, user);
  }

  async softDeleteUser(id: string): Promise<UserResDto | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .exec();
    return plainToInstance(UserResDto, user);
  }

  async findAllActive(): Promise<UserDocument[]> {
    return this.userModel.find({ deletedAt: null }).exec();
  }
}
