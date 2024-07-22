import { IdResponseDto } from '@libs/api/id.response-dto';
import { AggregateID } from '@libs/ddd/entity.base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export interface BaseResponseProps {
  id: AggregateID;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Most of our response objects will have properties like
 * id, createdAt and updatedAt so we can move them to a
 * separate class and extend it to avoid duplication.
 */
export class ResponseBase extends IdResponseDto {
  @Exclude()
  _createdAt: string;
  @Exclude()
  _updatedAt: string;

  constructor(props: BaseResponseProps) {
    super(props.id);
    this._createdAt = new Date(props.createdAt).toISOString();
    this._updatedAt = new Date(props.updatedAt).toISOString();
  }

  @ApiProperty({
    example: '2020-11-24T17:43:15.970Z',
    description: '생성 일자',
  })
  @Expose()
  get createdAt(): string {
    return this._createdAt;
  }

  @ApiProperty({
    example: '2020-11-24T17:43:15.970Z',
    description: '수정 일자',
  })
  @Expose()
  get updatedAt(): string {
    return this._createdAt;
  }
}
