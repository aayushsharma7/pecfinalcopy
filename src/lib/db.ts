import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create libSQL client for Turso
const libsql = createClient({
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
});

// Create PrismaClient with libSQL adapter
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: new PrismaLibSql(libsql),
        log: process.env.NODE_ENV !== "production" ? ["query"] : [],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
