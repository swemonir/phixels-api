import { NextFunction, Request, Response } from "express";

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    }
}

export default catchAsync;