import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export const CUSTOM_PRISMA_CLIENT = Symbol('CUSTOM_PRISMA_CLIENT');

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
