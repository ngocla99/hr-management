import { ListEmployeeReqDto } from "../dto/list-employee.req.dto";

export const getEmployeeFilter = (reqDto: ListEmployeeReqDto) => {
  const filter: Record<string, any> = {};
  if (reqDto.employeeNumber) {
    filter.employeeNumber = { $regex: reqDto.employeeNumber, $options: "i" };
  }
  if (reqDto.employmentStatus) {
    filter.employmentStatus = reqDto.employmentStatus;
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
