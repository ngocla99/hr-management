import { PartialType } from "@nestjs/swagger";
import { CreateDepartmentReqDto } from "./create-department.req.dto";

export class UpdateDepartmentReqDto extends PartialType(CreateDepartmentReqDto) {}
