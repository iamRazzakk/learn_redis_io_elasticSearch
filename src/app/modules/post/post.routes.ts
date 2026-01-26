import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();
router
  .route("/")
  .post(PostController.createPost)
  .get(PostController.getAllPosts);

export const PostRoutes = router;
