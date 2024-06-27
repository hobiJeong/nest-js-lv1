import { Type } from 'class-transformer';
import { IsInt, IsNumberString, IsOptional, IsPositive } from 'class-validator';

export class CursorDto {
  @IsNumberString()
  @IsOptional()
  before?: string;

  @IsNumberString()
  @IsOptional()
  after?: string;
}
