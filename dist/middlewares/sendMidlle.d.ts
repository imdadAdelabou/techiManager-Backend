import { Request, Response } from "express";
export declare function sendMiddle(req: Request, res: Response, next: () => void): Promise<Response<any, Record<string, any>>>;
