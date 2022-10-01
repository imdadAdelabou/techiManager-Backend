import { RoleType } from "./types";

export const checkRole = (userRole: RoleType, validRole: RoleType) => {
  return userRole === validRole;
};
