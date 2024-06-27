import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsIn, IsEnum } from 'class-validator';
import { Pagination } from 'src/common/decorator/pagination.decorator';
import { CursorDto } from 'src/common/dto/cursor.dto';

export class BasePaginationDto {
  @Pagination()
  paginationBy: number | CursorDto = 1;

  // 정렬
  // createdAt -> 생성된 시간의 내림차 / 오름차 순으로 정렬
  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  orderBy__createdAt: Prisma.SortOrder = Prisma.SortOrder.asc;

  // 몇개의 데이터를 응답으로 받을지
  @IsNumber()
  @IsOptional()
  take: number = 20;
}
