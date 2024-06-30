import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import {
  Paginator,
  PaginatorOptions,
} from 'prisma-extension-pagination/dist/extension';
import {
  CursorPaginationMeta,
  PageNumberCounters,
  PageNumberPagination,
} from 'prisma-extension-pagination/dist/types';
import {
  ENV_HOST_KEY,
  ENV_PROTOCOL_KEY,
} from 'src/common/const/env-keys.const';
import {
  FindManyAggregates,
  FindManyArgs,
} from 'src/common/const/find-many-args.type';
import { OrderInputType } from 'src/common/const/order-input.type';
import { WhereInputType } from 'src/common/const/where-input.type';

import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';
import { CursorDto } from 'src/common/dto/cursor.dto';
import { BaseModel } from 'src/common/entity/base.model';

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}

  paginate<
    T extends BasePaginationDto,
    M extends BaseModel,
    A extends FindManyAggregates,
  >(
    dto: T,
    prismaModel: { paginate: Paginator<PaginatorOptions> },
    path: string,
    overrideOptions?: FindManyArgs<A, M>,
  ) {
    if (typeof dto.paginationBy === 'number') {
      return this.pagePaginate<T, M, WhereInputType, OrderInputType, A>(
        dto,
        prismaModel,
        overrideOptions,
      );
    } else if (dto.paginationBy instanceof CursorDto) {
      return this.cursorPaginate(dto, prismaModel, path);
    }
  }

  private async pagePaginate<
    T extends BasePaginationDto,
    M extends BaseModel,
    K extends WhereInputType,
    Y extends OrderInputType,
    A extends FindManyAggregates,
  >(
    dto: T,
    prismaModel: { paginate: Paginator<PaginatorOptions> },
    overrideOptions = <FindManyArgs<A, M>>{},
  ) {
    const { where, orderBy } = this.composeFindOptions<K, Y>(dto);

    return prismaModel
      .paginate({
        where,
        orderBy,
        ...(overrideOptions as any),
      })
      .withPages({
        includePageCount: true,
        page: dto.paginationBy as number,
        limit: dto.take,
      });
  }

  private async cursorPaginate<
    T extends BasePaginationDto,
    M extends BaseModel,
    K extends WhereInputType,
    Y extends OrderInputType,
  >(
    dto: T,
    prismaModel: { paginate: Paginator<PaginatorOptions> },
    path: string,
    overrideOptions = <FindManyArgs<FindManyAggregates, M>>{},
  ) {
    const { where, orderBy } = this.composeFindOptions<K, Y>(dto);

    const { before, after } = dto.paginationBy as CursorDto;

    const [data, cursorPaginationMeta]: [M[], CursorPaginationMeta] =
      await prismaModel
        .paginate({
          where,
          orderBy,
          ...(overrideOptions as any),
        })
        .withCursor({
          limit: dto.take,
          before,
          after,
        });

    const lastItem =
      data.length > 0 && data.length === dto.take
        ? data[data.length - 1]
        : null;

    const protocol = this.configService.get<string>(ENV_PROTOCOL_KEY);
    const host = this.configService.get<string>(ENV_HOST_KEY);

    const nextUrl = lastItem && new URL(`${protocol}://${host}/${path}`);

    if (nextUrl) {
      /**
       * dto의 키값들을 루핑하면서
       * 키값에 해당되는 벨류가 존재한다면
       * param에 그대로 붙여 넣는다.
       *
       * 단, where__id_more_than 값만 lastItem의 마지막 값으로 넣어준다.
       */
      for (const key of Object.keys(dto)) {
        if (dto[key]) {
          if (
            key !== 'where__id__more_than' &&
            key !== 'where__id__less_than'
          ) {
            nextUrl.searchParams.append(key, dto[key]);
          }
        }
      }

      let object;

      if (dto.orderBy__createdAt === Prisma.SortOrder.asc) {
        object = { before: lastItem.id.toString() };
      } else {
        object = { after: lastItem.id.toString() };
      }

      const searchParams = new URLSearchParams(object).toString();

      nextUrl.searchParams.append('paginationBy', searchParams);
    }

    return {
      data,
      cursorPaginationMeta: {
        ...cursorPaginationMeta,
        next: nextUrl?.toString() ?? null,
      },
    };
  }

  private composeFindOptions<
    K extends WhereInputType,
    Y extends OrderInputType,
  >(dto: BasePaginationDto) {
    const where = <K>{};
    const orderBy = <Y>{};

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith('where__')) {
        Object.assign(where, this.parseWhereFilter<K>(key, value));
      } else if (key.startsWith('orderBy__')) {
        Object.assign(orderBy, this.parseOrderFilter<Y>(key, value));
      }
    }

    return {
      where,
      orderBy,
    };
  }

  private parseWhereFilter<K extends WhereInputType>(
    key: string,
    value: any,
  ): K {
    const options = <K>{};
    const split = key.split('__');

    if (split.length < 2 || split.length > 3) {
      throw new BadRequestException(
        `where 필터는 '__'로 split 했을 때 길이가 2 또는 3이어야 합니다 - 문제되는 키값: ${key}`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, field, operator] = split as [string, keyof K, string];
    if (split.length === 2) {
      options[field] = value;
    } else if (split.length === 3) {
      options[field] = { [operator]: value } as any;
    }

    return options;
  }

  private parseOrderFilter<Y extends OrderInputType>(
    key: string,
    value: any,
  ): Y {
    const options = <Y>{};
    const split = key.split('__');

    if (split.length !== 2) {
      throw new BadRequestException(
        `orderBy는 '__'로 split 했을 때 길이가 2이어야 합니다 - 문제되는 키값: ${key}`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, field] = split as [string, keyof Y];
    options[field] = value;

    return options;
  }
}
