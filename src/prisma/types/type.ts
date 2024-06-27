import { customPrismaClient } from 'src/prisma/prisma-extension.service';

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
