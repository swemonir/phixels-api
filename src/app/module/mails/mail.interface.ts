export type TMailRequest = {
    email: string;
    subject: string;
    text: string;
    details?: string;
    fileAttachments?: string[];
}
