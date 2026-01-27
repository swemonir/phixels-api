import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BlogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
    // Check for uploaded image
    if (req.file) {
        req.body.image = (req.file as any).path;
    }

    const result = await BlogService.createBlog(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
});

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await BlogService.getAllBlogs();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blogs retrieved successfully",
        data: result
    });
});

const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogService.getSingleBlog(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog retrieved successfully",
        data: result
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    
    // Check for uploaded image
    if (req.file) {
        req.body.image = (req.file as any).path;
    }

    const result = await BlogService.updateBlog(id as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog updated successfully",
        data: result
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogService.deleteBlog(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog deleted successfully",
        data: result
    });
});

export const BlogController = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};
