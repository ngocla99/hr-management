import { BaseEntity } from "@/common/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TeamDocument = HydratedDocument<Team>;

export enum TeamStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

@Schema({
  timestamps: true,
})
export class Team extends BaseEntity {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 100,
  })
  name: string;

  @Prop({
    maxlength: 500,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: "Department",
    required: true,
  })
  department: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
  })
  teamLead: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  })
  members: Types.ObjectId[];

  @Prop({
    type: String,
    enum: TeamStatus,
    default: TeamStatus.ACTIVE,
  })
  status: TeamStatus;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
  })
  createdBy: Types.ObjectId;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

export const TeamSchemaFactory = () => {
  const teamSchema = TeamSchema;

  // Create indexes for optimized queries
  teamSchema.index({ name: 1 });
  teamSchema.index({ department: 1 });
  teamSchema.index({ teamLead: 1 });
  teamSchema.index({ status: 1 });
  teamSchema.index({ createdBy: 1 });
  teamSchema.index({ createdAt: -1 });

  return teamSchema;
};
