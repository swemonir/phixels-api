import express from "express";
import { BlogController } from "./blog.controller";
import validateRequest from "../../middleware/validateRequest";
import { BlogValidation } from "./blog.validation";
import { upload } from "../../utils/upload.utils";

const router = express.Router();

router.post(
    '/create',
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
    upload.single('image'),
    (req, res, next) => {
        req.body = JSON.parse(JSON.stringify(req.body));
        next();
    },
    validateRequest(BlogValidation.updateBlogValidationSchema),
    BlogController.updateBlog
);

router.delete('/:id', BlogController.deleteBlog);

export const BlogRouter = router;
