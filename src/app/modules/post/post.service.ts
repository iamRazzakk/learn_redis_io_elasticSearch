import { redisDel, redisGet, redisSet } from "../../../helpers/redisHelper";
import { IPost } from "./post.interface";
import { PostModel } from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const result = await PostModel.insertMany(payload);
  await redisDel("posts");
  return result;
};

const getAllPostsFromDB = async (): Promise<IPost[]> => {
  const cacheData = await redisGet("posts", {});
  if (cacheData) {
    return cacheData;
  }
  const result = await PostModel.find();
  await redisSet("posts", result, 300, {});
  return result;
};

export const PostService = {
  createPostIntoDB,
  getAllPostsFromDB,
};
