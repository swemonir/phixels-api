import { model, Schema } from "mongoose";

export interface IMailLog {
    email: string;
    subject: string;
    text: string;
    details?: string;
    status: 'sent' | 'failed';
    sentAt?: Date;
    error?: string;
}

const mailLogSchema = new Schema<IMailLog>({
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ["sent", "failed"]
    },
    sentAt: {
        type: Date
    },
    error: {
        type: String
    }
}, {
    timestamps: true
});

export const MailLog = model('MailLog', mailLogSchema);
