import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    writer: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    readingTime: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

export const Blog = model<TBlog>('Blog', blogSchema);
