import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MailService } from "./mail.service";
import httpStatus from 'http-status';

const sendMail = catchAsync(async (req, res) => {
    // Check if files exist and mapping them to array of Strings
    if (req.files && Array.isArray(req.files)) {
        req.body.fileAttachments = req.files.map((file: any) => file.path);
    }
    
    const result = await MailService.sendFormalMail(req.body);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Email sent successfully",
        data: result
    });
});

const getMailLogs = catchAsync(async (req, res) => {
    const result = await MailService.getMailLogs();
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Mail logs retrieved successfully",
        data: result
    });
});

export const MailController = {
    sendMail,
    getMailLogs
};
