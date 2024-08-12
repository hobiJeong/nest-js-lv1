import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { pagination } from 'prisma-extension-pagination';
import { CustomPrismaClient } from 'src/prisma/types/type';

export const customPrismaClient = (prisma: PrismaClient) => {
  return prisma.$extends(pagination());
};

@Injectable()
export class PrismaClientExtended
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaClientExtended.name);
  private customPrismaClient!: CustomPrismaClient;

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });

    this.$on<'query'>('query', (event: Prisma.QueryEvent) => {
      const { query, params, duration } = event;

      if (['COMMIT', 'BEGIN', 'ROLLBACK'].includes(query)) {
        this.logger.debug('Query: ' + query);

        return;
      }

      this.logger.debug(
        'Query: ' +
          query +
          '\n' +
          'Params: ' +
          params +
          '\n' +
          'Duration: ' +
          duration +
          'ms',
      );
    });
  }

  get client() {
    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient;
  }

  async onModuleInit() {
    super.$on('error', (event) => {
      this.logger.verbose(event.target);
    });
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
