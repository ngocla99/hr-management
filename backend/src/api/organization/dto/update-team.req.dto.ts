import { PartialType } from "@nestjs/swagger";
import { CreateTeamReqDto } from "./create-team.req.dto";

export class UpdateTeamReqDto extends PartialType(CreateTeamReqDto) {}
