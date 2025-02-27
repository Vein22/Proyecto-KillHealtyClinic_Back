import { NextFunction, Request, Response } from "express";

export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
    const currentDateTime = new Date().toDateString();
    console.log(`[${currentDateTime}] you are executing a method: [${req.method}] on the route: [${req.url}]`);
    next();
}

