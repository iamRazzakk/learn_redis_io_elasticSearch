import { redisDel, redisGet, redisSet } from "../../../helpers/redisHelper";
import QueryBuilder from "../../builder/QueryBuilder";
import { IPost } from "./post.interface";
import { PostModel } from "./post.model";

const createPostIntoDB = async (payload: IPost) => {
  const result = await PostModel.insertMany(payload);
  await redisDel("posts", {});
  return result;
};

const getAllPostsFromDB = async (query: Record<string, any>) => {
  const cacheData = await redisGet<{ data: any; meta: any }>("posts", query);
  if (cacheData) {
    console.log("✋ redis cache hit");
    return cacheData;
  }
  const qb = new QueryBuilder(PostModel.find(), query)
    .search(["title", "content"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [data, meta] = await Promise.all([
    qb.modelQuery.exec(),
    qb.getPaginationInfo(),
  ]);

  await redisSet("posts", { meta, data }, 300, query);
  console.log("👽 redis cache miss");
  return { data, meta };
};

export const PostService = {
  createPostIntoDB,
  getAllPostsFromDB,
};
