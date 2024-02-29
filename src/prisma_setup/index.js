import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient()
export const prisma = globalThis.prisma ?? new PrismaClient();
