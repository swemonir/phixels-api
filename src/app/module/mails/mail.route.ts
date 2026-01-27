import express from "express";
import { MailController } from "./mail.controller";
import validateRequest from "../../middleware/validateRequest";
import { MailValidation } from "./mail.validation";

import { upload } from "../../utils/upload.utils";

const router = express.Router();

router.post(
    '/send',
    upload.array('files'),
    (req, res, next) => {
        req.body = JSON.parse(JSON.stringify(req.body));
        next();
    },
    validateRequest(MailValidation.sendMailValidationSchema),
    MailController.sendMail
);

router.get(
    '/logs',
    MailController.getMailLogs
);

export const MailRouter = router;
