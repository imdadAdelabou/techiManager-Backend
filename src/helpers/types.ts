export enum RoleType {
  user,
  garden,
  admin,
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  isActive: boolean;
  password: string;
  role: RoleType;
}
