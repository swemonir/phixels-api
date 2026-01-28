import express from "express";
import { BlogController } from "./blog.controller";
import validateRequest from "../../middleware/validateRequest";
import { BlogValidation } from "./blog.validation";
import { upload } from "../../utils/upload.utils";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";

const router = express.Router();

router.post(
    '/create',
    auth(USER_ROLE.admin),
    upload.single('image'),
    (req, res, next) => {
        req.body = JSON.parse(JSON.stringify(req.body));
        next();
    },
    validateRequest(BlogValidation.createBlogValidationSchema),
    BlogController.createBlog
);

router.get('/', BlogController.getAllBlogs);

router.get('/:id', BlogController.getSingleBlog);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    upload.single('image'),
    (req, res, next) => {
        req.body = JSON.parse(JSON.stringify(req.body));
        next();
    },
    validateRequest(BlogValidation.updateBlogValidationSchema),
    BlogController.updateBlog
);

router.delete('/:id', auth(USER_ROLE.admin), BlogController.deleteBlog);

export const BlogRouter = router;
