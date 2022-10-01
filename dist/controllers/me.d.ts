import { Request, Response } from "express";
export declare const me: (req: Request, res: Response, next: () => void) => Promise<Response<any, Record<string, any>>>;
