import { model, Schema } from "mongoose";
import { IPost } from "./post.interface";

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const PostModel = model<IPost>("Post", postSchema);
