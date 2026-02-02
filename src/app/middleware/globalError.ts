import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../Interface/errorType";
import { ZodError } from "zod";
import zodError from "../error/zodError";
import duplicateError from "../error/duplicateError";
import validationError from "../error/validationError";
import castError from "../error/castError";
import AppError from "../error/appError";

const globalError: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong'
    let errorSource: TErrorSource = [
        {
            path: '',
            message: err

        }
    ]
    // Log error for server-side debugging
    console.error('------- API Error Start -------');
    console.error('Time:', new Date().toISOString());
    console.error('Path:', req.path);
    console.error('Method:', req.method);
    console.error('Error:', err);
    console.error('------- API Error End -------');

    if (err instanceof ZodError) {
        const zodErrors = zodError(err)
        statusCode = zodErrors?.statusCode
        message = zodErrors?.message
        errorSource = zodErrors?.errorSource
    }
    else if (err.name === 'ValidationError') {
        const validationErrors = validationError(err)
        statusCode = validationErrors?.statusCode
        message = validationErrors?.message
        errorSource = validationErrors?.errorSource
    }
    else if (err.name === 'CastError') {
        const castErrors = castError(err)
        statusCode = castErrors?.statusCode
        message = castErrors?.message
        errorSource = castErrors?.errorSource
    }
    else if (err.code === 11000) {
        const duplicateErrors = duplicateError(err)
        statusCode = duplicateErrors?.statusCode
        message = duplicateErrors?.message
        errorSource = duplicateErrors?.errorSource
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
        errorSource = [
            {
                path: 'App Error',
                message: err.message
            }
        ]
    }
    else if (err instanceof Error) {
        message = err.message
        errorSource = [
            {
                path: 'Error',
                message: err.message
            }
        ]
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: err.stack
    })
}

export default globalError