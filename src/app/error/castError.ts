import mongoose from "mongoose";
import { TErrorResponse, TErrorSource } from "../Interface/errorType";

const castError = (err: mongoose.Error.CastError): TErrorResponse => {
    const errorSource: TErrorSource = [
        {
            path: err.path,
            message: err.message
        }
    ]
    const statusCode = 400;
    return {
        statusCode,
        errorSource,
        message: 'Invalide ID Cast'
    }
}

export default castError;