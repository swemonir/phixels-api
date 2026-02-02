import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../Interface/types";
import { CustomRequest } from "../Interface/request";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/appError";
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../module/authentication/auth.model";
import config from "../config";

const auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // Check token in cookie first, then Authorization header
        let token = req.cookies?.token;

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            throw new AppError(httpStatus.BAD_REQUEST, 'You Have not authorized')
        }

        const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload

        const { email, role, iat, exp } = decoded
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError(httpStatus.FORBIDDEN, 'You are not allowed to access this route')
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
        }

        if (user.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted')
        }

        if (!user.isVerified) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Please verify your email first')
        }

        (req as CustomRequest).user = decoded
        next()
    })
}

export default auth