import { BadRequestException, Injectable } from '@nestjs/common';
import { FILTER_MAPPER } from 'src/common/const/filter-mapper.const';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';
import { BaseModel } from 'src/common/entity/base.entity';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class CommonService {
  paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    if (dto.page) {
      return this.pagePaginate(dto, repository, overrideFindOptions);
    } else {
      return this.cursorPaginate(dto, repository, overrideFindOptions, path);
    }
  }

  private async pagePaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
  ) {}

  private async cursorPaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    /**
     * where__likeCount_more_than
     *
     * where__title__ilike
     */
  }

  private composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto,
  ): FindManyOptions<T> {
    /**
     * where,
     * order,
     * take,
     * skip -> page 기반일때만
     */
    /**
     * DTO의 현재 생긴 구조는 아래와 같다
     *
     * {
     *  where__id__more_than: 1,
     *  order__createdAt: 'ASC'
     * }
     *
     * 현재는 where__id__more_than / where__id__less_than에 해당되는 where 필터만 사용중 이지만
     * 나중에 where__likeCount__more_than 이나 where__title__ilike등 추가 필터를 넣고 싶어 졌을 때
     * 모든 where 필터들을 자동으로 파싱 할 수 있을만한 기능들을 제작해야 한다.
     *
     * 1) where로 시작한다면 필터 로직을 적용한다.
     * 2) order로 시작하면 정렬 로직을 적용한다.
     * 3) 필터 로직을 적용한다면 '__' 기준으로 split을 했을 때 3개의 값으로 나뉘는 지
     *    2개의 값으로 나뉘는지 확인한다.
     *    3-1) 3개의 값으로 나뉜다면 FILTER_MAPPER에서 해당되는 operator 함수를 찾아서 적용한다.
     *         ex) ['where', 'id', 'more_than']
     *    3-2) 2개의 값으로 나뉜다면 정확한 값을 필터하는 것이기 때문에 operator 없이 적용한다.
     *         ex) where__id
     *             ['where', 'id']
     * 4) order의 경우 3-2와 같이 적용한다.
     */

    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for (const [key, value] of Object.entries(dto)) {
      // key -> where__id__less_than
      // value -> 1

      if (key.startsWith('where__')) {
        where = {
          ...where,
          ...this.parseWhereFilter(key, value),
        };
      } else if (key.startsWith('order__')) {
        order = {
          ...order,
          ...this.parseOrderFilter(key, value),
        };
      }
    }

    return {
      where,
      order,
      take: dto.take,
      skip: dto.page ? dto.take * (dto.page - 1) : null,
    };
  }

  private parseWhereFilter<T extends BaseModel>(
    key: string,
    value: any,
  ): FindOptionsWhere<T> {
    const options: FindOptionsWhere<T> = {};

    /**
     * 예를 들어 where__id__more_than
     * __를 기준으로 나눴을 때
     *
     * ['where', 'id', 'more_than']으로 나눌 수 있다.
     */
    const split = key.split('__');

    if (split.length !== 2 && split.length !== 3) {
      throw new BadRequestException(
        `where 필터는 '__'로 split 했을 때 길이가 2 또는 3이어야 합니다 - 문제되는 키값: ${key}`,
      );
    }

    /**
     * 길이가 2일 경우에는
     * where__id = 3
     *
     * FindOptionsWhere로 풀어 보면
     * 아래와 같다
     *
     * {
     *  where: {
     *      id: 3,
     *  }
     * }
     */
    if (split.length === 2) {
      // ['where', 'id']
      const [_, field] = split;

      /**
       * field -> 'id'
       * value -> 3
       *
       * {
       *      id: 3,
       * }
       */
      options[field] = value;
    } else {
      /**
       * 길이가 3일 경우에는 TypeORM 유틸리티 적용이 필요한 경우다.
       *
       * where__id__more_than의 경우
       * where는 버려도 되고 두번째 값은 필터링 키값이 되고
       * 세번째 값은 TypeORM 유틸리티가 된다.
       *
       * FILTER_MAPPER에 미리 정의해둔 값들로
       * field 값에 FILTER_MAPPER에서 해당되는 utility를 가져온 후
       * 값에 적용 해준다.
       */
      // ['where', 'id', 'more_than']
      const [_, field, operator] = split as [
        string,
        string,
        keyof typeof FILTER_MAPPER,
      ];

      // where__id__between = 3,4
      // 만약에 split 대상 문자가 존재하지 않으면 길이가 무조건 1이다.
      const values = value.toString().split(',');

      // field -> id
      // operator -> more_than
      //   FILTER_MAPPER[operator] -> MoreThan
      if (operator === 'between') {
        operator[field] = FILTER_MAPPER[operator](values[0], values[1]);
      } else {
        options[field] = FILTER_MAPPER[operator](value);
      }
    }

    return options;
  }

  private parseOrderFilter<T extends BaseModel>(
    key: string,
    value: any,
  ): FindOptionsOrder<T> {}
}
