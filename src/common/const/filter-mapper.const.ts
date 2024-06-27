import { Prisma } from '@prisma/client';
import { BaseModel } from 'src/common/entity/base.model';

export const stringFilterMapper = <
  T extends keyof Prisma.StringFilter<BaseModel>,
>(
  operator: T,
  value: string,
) => {
  return {
    [operator]: value,
  };
};

export const intFilterMapper = <T extends keyof Prisma.IntFilter<BaseModel>>(
  operator: T,
  value: number,
) => {
  return { [operator]: value };
};
