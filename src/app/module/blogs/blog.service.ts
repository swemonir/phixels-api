import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog = async (payload: TBlog) => {
    const result = await Blog.create(payload);
    return result;
};

const getAllBlogs = async () => {
    const result = await Blog.find().sort({ createdAt: -1 });
    return result;
};

const getSingleBlog = async (id: string) => {
    const result = await Blog.findById(id);
    return result;
};

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
    const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteBlog = async (id: string) => {
    const result = await Blog.findByIdAndDelete(id);
    return result;
};

export const BlogService = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};
