import { ListUserReqDto } from "../dto/list-user.req.dto";

export const getUserFilter = (reqDto: ListUserReqDto) => {
  const filter: Record<string, any> = {};
  if (reqDto.role) {
    filter.role = reqDto.role;
  }
  if (reqDto.status) {
    filter.status = reqDto.status;
  }

  const createdAtFilter: Record<string, Date> = {};
  if (reqDto.createdAtFrom) {
    createdAtFilter.$gte = reqDto.createdAtFrom;
  }
  if (reqDto.createdAtTo) {
    createdAtFilter.$lte = reqDto.createdAtTo;
  }
  if (Object.keys(createdAtFilter).length > 0) {
    filter.createdAt = createdAtFilter;
  }

  if (reqDto.username) {
    filter.username = { $regex: reqDto.username, $options: "i" };
  }

  if (reqDto.fullName) {
    filter.$or = [
      { firstName: { $regex: reqDto.fullName, $options: "i" } },
      { lastName: { $regex: reqDto.fullName, $options: "i" } },
    ];
  }

  if (reqDto.department) {
    filter.department = reqDto.department;
  }

  if (reqDto.jobRole) {
    filter.jobRole = reqDto.jobRole;
  }

  if (reqDto.employmentType) {
    filter.employmentType = reqDto.employmentType;
  }

  return filter;
};
