import { PrismaPg } from "@prisma/adapter-pg";

import config from "../prisma.config";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: config.datasource?.url,
}); // Initialize the PostgreSQL adapter

// const prisma = new PrismaClient({ adapter }); // Removed to implement singleton pattern

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}; // Extend the global object to include prisma instance

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  }); // Create a new instance only if it doesn't exist

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
} // Prevent multiple instances in development environment
