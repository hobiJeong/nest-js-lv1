import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientExtended } from 'src/prisma/prisma-extension.service';

@Injectable()
export class PrismaService
  extends PrismaClientExtended
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

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

    this.$on<any>('query', (event: Prisma.QueryEvent) => {
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

  async onModuleInit() {
    this.$on('error', (event) => {
      this.logger.verbose(event.target);
    });
    await this.$connect();
  }
}
