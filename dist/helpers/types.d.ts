export declare enum RoleType {
    user = 0,
    garden = 1,
    admin = 2
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
