import express from "express";
import { PostRoutes } from "../modules/post/post.routes";
const router = express.Router();

const apiRoutes = [
  {
    path: "/posts",
    route: PostRoutes,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
