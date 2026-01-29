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
        // Parse form-data fields properly
        console.log(req.body);
        
        for (const key in req.body) {
            try {
                // Try to parse as JSON first (for arrays)
                req.body[key] = JSON.parse(req.body[key]);
            } catch (error) {
                // If not JSON, keep as string
                req.body[key] = req.body[key];
            }
        }
        console.log('Parsed body:', JSON.stringify(req.body, null, 2));
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
        // Parse form-data fields properly
        for (const key in req.body) {
            try {
                // Try to parse as JSON first (for arrays)
                req.body[key] = JSON.parse(req.body[key]);
            } catch (error) {
                // If not JSON, keep as string
                req.body[key] = req.body[key];
            }
        }
        next();
    },
    validateRequest(BlogValidation.updateBlogValidationSchema),
    BlogController.updateBlog
);

router.delete('/:id', auth(USER_ROLE.admin), BlogController.deleteBlog);

export const BlogRouter = router;
