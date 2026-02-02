import AppError from "../../error/appError";
import httpStatus from "http-status";
import { TMailRequest } from "./mail.interface";
import { SendMail, getFormalEmailHtml, getFormalEmailText } from "./utils";
import { MailLog } from "./mail.model";

const sendFormalMail = async (data: TMailRequest) => {
    const { email, subject, text, details, fileAttachments } = data;

    // Create formal HTML email template
    const htmlContent = getFormalEmailHtml(subject, text, details);

    // Plain text version
    const plainText = getFormalEmailText(subject, text, details);

    // Prepare attachments if present
    const attachments = fileAttachments?.map(url => ({
        filename: url.split('/').pop() || 'attachment',
        path: url
    }));

    try {
        // Send the email
        const success = await SendMail({
            to: email,
            subject: subject,
            text: plainText.trim(),
            html: htmlContent,
            attachments: attachments
        });

        if (!success) {
            // Log failed attempt to database
            await MailLog.create({
                email,
                subject,
                text,
                details,
                status: 'failed',
                error: 'Email sending failed'
            });

            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to send email");
        }

        // Log successful attempt to database
        await MailLog.create({
            email,
            subject,
            text,
            details,
            status: 'sent',
            sentAt: new Date()
        });

        return {
            message: "Email sent successfully",
            sentTo: email
        };

    } catch (error: any) {
        // Log error to database
        await MailLog.create({
            email,
            subject,
            text,
            details,
            status: 'failed',
            error: error.message || 'Unknown error'
        });

        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to send email");
    }
};

const getMailLogs = async () => {
    const logs = await MailLog.find().sort({ createdAt: -1 }).limit(100);
    return logs;
};

export const MailService = {
    sendFormalMail,
    getMailLogs
};
