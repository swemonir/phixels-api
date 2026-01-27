import { ZodError, ZodIssue } from "zod";
import httpStatus from "http-status";
import { TErrorSource } from "../Interface/errorType";

const zodError = (err: ZodError) => {
    const statusCode = httpStatus.BAD_REQUEST
    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
        return {
            path: String(issue.path[issue.path.length - 1]),
            message: issue.message
        }
    })
    return {
        statusCode,
        message: 'Zod Validation Error',
        errorSource
    }
}

export default zodError;