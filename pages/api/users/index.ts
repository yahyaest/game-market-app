import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";
import {
  and,
  between,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  isNotNull,
  isNull,
  like,
  lt,
  lte,
  ne,
  not,
  notBetween,
  notIlike,
  notInArray,
  notLike,
  or,
} from "drizzle-orm";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const result = await db.select().from(users);

    return res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
