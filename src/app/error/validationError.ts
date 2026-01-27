import mongoose from "mongoose";
import { TErrorSource } from "../Interface/errorType";
import httpStatus from "http-status";

const validationError = (err: mongoose.Error.ValidationError) => {
    const errorSource: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val.path,
            message: val.message
        }
    })

    const statusCode = httpStatus.BAD_REQUEST
    return {
        statusCode,
        message: "Validation Error",
        errorSource
    }
}

export default validationError