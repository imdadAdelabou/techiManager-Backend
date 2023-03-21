import { Request, Response } from "express";
import { RoleType } from "../helpers/types";
export declare const matching: {
    garden: RoleType;
    admin: RoleType;
    user: RoleType;
};
export declare const isAdminOrGarden: (req: Request, res: Response, next: () => void) => Promise<Response<any, Record<string, any>>>;
