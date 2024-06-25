import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export const CUSTOM_PRISMA_CLIENT = Symbol('CUSTOM_PRISMA_CLIENT');

@Module({
  providers: [
    {
      provide: CUSTOM_PRISMA_CLIENT,
      useFactory: (prisma: PrismaService) => {
        const customPrismaClient = prisma.$extends({
          model: {
            $allModels: {
              async exists<T>(
                this: T,
                where: Prisma.Args<T, 'findFirst'>['where'],
              ): Promise<boolean> {
                const context = Prisma.getExtensionContext(this);
                const result = await (context as any).findFirst({ where });
                return result !== null;
              },
            },
          },
        });

        return customPrismaClient;
      },
      inject: [PrismaService],
    },
  ],
  exports: [CUSTOM_PRISMA_CLIENT],
})
export class PrismaModule {}
