import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PostService } from "./post.service";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.createPostIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.getAllPostsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Posts retrieved successfully",
    data: result,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
};
