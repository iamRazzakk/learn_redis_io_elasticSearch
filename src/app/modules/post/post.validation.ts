import { z } from "zod";

export const createPostValidation = z.object({
  body: z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    content: z.string().min(20, "Content must be at least 20 characters long"),
  }),
});

export const postValidation = {
  createPostValidation,
};
