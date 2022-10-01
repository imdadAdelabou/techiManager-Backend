import { Request, Response } from "express";
export declare const auth: (req: Request, res: Response, next: () => void) => Response<any, Record<string, any>>;
