import { IsNumberString, IsOptional } from 'class-validator';

export class CursorDto {
  @IsNumberString()
  @IsOptional()
  before?: string;

  @IsNumberString()
  @IsOptional()
  after?: string;
}
