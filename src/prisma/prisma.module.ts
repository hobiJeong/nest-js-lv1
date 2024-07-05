import { Module } from '@nestjs/common';
import { PrismaClientExtended } from 'src/prisma/prisma-extension.service';

export const CUSTOM_PRISMA_CLIENT = Symbol('CUSTOM_PRISMA_CLIENT');

@Module({
  providers: [
    PrismaClientExtended,
    {
      provide: CUSTOM_PRISMA_CLIENT,
      useFactory: (prismaClientExtended: PrismaClientExtended) =>
        prismaClientExtended.client,
      inject: [PrismaClientExtended],
    },
  ],
  exports: [PrismaClientExtended, CUSTOM_PRISMA_CLIENT],
})
export class PrismaModule {}
