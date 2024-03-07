import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
  datasources: { db: { url: "postgresql://root:root@localhost:5555/crud?schema=public" } },
});

export * from '@prisma/client';
