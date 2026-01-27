import { z } from "zod";

const sendMailValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required"
        }).email({
            message: "Invalid email format"
        }),
        subject: z.string({
            required_error: "Subject is required"
        }).min(1, {
            message: "Subject cannot be empty"
        }),
        text: z.string({
            required_error: "Text is required"
        }).min(1, {
            message: "Text cannot be empty"
        }),
        details: z.string().optional(),
        fileAttachments: z.array(z.string()).optional()
    })
});

export const MailValidation = {
    sendMailValidationSchema
};
