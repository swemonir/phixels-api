import { TErrorResponse, TErrorSource } from "../Interface/errorType"
import httpStatus from "http-status"

const duplicateError = (err: any): TErrorResponse => {
    const match = err.message.match(/"([^"]*)"/)
    const extendMessage = match.length
    const errorSource: TErrorSource = [
        {
            path: 'duplicate',
            message: `${extendMessage} Email is already exist`
        }
    ]


    const statusCode = httpStatus.BAD_REQUEST
    return {
        statusCode,
        message: "Email is already exist",
        errorSource
    }
}

export default duplicateError