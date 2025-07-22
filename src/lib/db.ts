// src/lib/db.ts

import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    // Optional: Add logging for debugging if you want
    // log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
