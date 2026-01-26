import { redisClient } from "../config/redis.client";

export const redisSet = async <T>(
  key: string,
  value: T,
  ttl: number = 60,
  query: Record<string, any> = {},
) => {
  const queryString = new URLSearchParams(
    Object.entries(query)
      .filter(([_, v]) => v !== undefined && v !== null && v !== "")
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => [k, String(v)]),
  ).toString();
  const result = await redisClient.set(
    queryString ? `${key}?${queryString}` : key,
    JSON.stringify(value),
    "EX",
    ttl,
  );
  return result;
};

export const redisGet = async <T>(
  key: string,
  query: Record<string, any> = {},
): Promise<T | null> => {
  const queryString = new URLSearchParams(
    Object.entries(query)
      .filter(([_, v]) => v !== undefined && v !== null && v !== "")
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => [k, String(v)]),
  ).toString();
  const data = await redisClient.get(
    queryString ? `${key}?${queryString}` : key,
  );
  if (!data) {
    return null;
  }
  return JSON.parse(data) as T;
};

export const redisDel = async (
  key: string,
  query: Record<string, any> = {},
) => {
  const queryString = new URLSearchParams(
    Object.entries(query)
      .filter(([_, v]) => v !== undefined && v !== null && v !== "")
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => [k, String(v)]),
  ).toString();

  const redisKey = queryString ? `${key}?${queryString}` : key;
  return await redisClient.del(redisKey);
};
