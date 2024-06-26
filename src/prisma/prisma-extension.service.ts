import { Prisma, PrismaClient } from '@prisma/client';
import { pagination } from 'prisma-extension-pagination';

export const customPrismaClient = (prisma: PrismaClient) => {
  return prisma.$extends(pagination());
};

export class PrismaClientExtended extends PrismaClient<
  Prisma.PrismaClientOptions,
  'query' | 'error'
> {
  private customPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient;
  }
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
