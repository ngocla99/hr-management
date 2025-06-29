import { UserRole } from "@/constants/roles.constant";

export type JwtPayloadType = {
  id: string;
  sessionId: string;
  role: UserRole;
  iat: number;
  exp: number;
};
