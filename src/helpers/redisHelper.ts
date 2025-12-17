import { redisClient } from "../config/redis.client";

export const redisSet = async <T>(
  key: string,
  value: T,
  ttl: number = 60,
  query: Record<string, any>
) => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const result = await redisClient.set(
    `${key}?${queryString}`,
    JSON.stringify(value),
    "EX",
    ttl
  );
  return result;
};

export const redisGet = async (key: string, query: Record<string, any>) => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const data = JSON.parse(
    (await redisClient.get(`${key}:${queryString}`)) || "[]"
  );
  if (Array.isArray(data) && !data.length) {
    return null;
  }

  return data;
};
export const redisDel = async (
  key: string,
  query: Record<string, any> = {}
) => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const redisKey = queryString ? `${key}?${queryString}` : key;

  return await redisClient.del(redisKey);
};
