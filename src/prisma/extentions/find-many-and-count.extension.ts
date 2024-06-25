// src/prisma/extensions/find-many-count.extension.ts

import { Prisma } from '@prisma/client';

export type FindManyAndCount<TModel, TArgs> = ReturnType<
  typeof createFindManyAndCountExtension<TModel, TArgs>
>['model']['$allModels']['findManyAndCount'];

export const findManyAndCountExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    name: 'findManyAndCount',
    model: {
      $allModels: {
        async findManyAndCount<
          TModel,
          TArgs extends Prisma.Args<TModel, 'findMany'>,
        >(
          this: TModel,
          args?: Prisma.Exact<TArgs, Prisma.Args<TModel, 'findMany'>>,
        ): Promise<
          FindManyAndCountResult<Prisma.Result<TModel, TArgs, 'findMany'>>
        > {
          const context = Prisma.getExtensionContext(this);

          const [records, totalRecords] = await client.$transaction([
            (context as any).findMany(args),
            (context as any).count({ where: (args as any)?.where }),
          ]);

          const take = (args as any)?.take;
          let totalPages = totalRecords === 0 ? 0 : 1;

          if (take === 0) {
            totalPages = 0;
          } else if (typeof take === 'number') {
            totalPages = Math.ceil(totalRecords / take);
          }

          return [records, totalRecords, totalPages];
        },
      },
    },
  });
});

export function createFindManyAndCountExtension<TModel = any, TArgs = any>(
  prisma: PrismaClient,
) {
  return {
    name: 'findManyAndCount',
    model: {
      $allModels: {
        findManyAndCount(
          this: TModel,
          args?: Prisma.Exact<TArgs, Prisma.Args<TModel, 'findMany'>>,
        ): Promise<[Prisma.Result<TModel, TArgs, 'findMany'>, number]> {
          const context = Prisma.getExtensionContext(this);

          return prisma.$transaction([
            (context as any).findMany(args),
            (context as any).count({ where: (args as any)?.where }),
          ]);
        },
      },
    },
  };
}

export type FindManyAndCount<TModel, TArgs> = ReturnType<
  typeof createFindManyAndCountExtension<TModel, TArgs>
>['model']['$allModels']['findManyAndCount'];
