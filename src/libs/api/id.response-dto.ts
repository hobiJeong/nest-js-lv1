import { AggregateID } from '@libs/ddd/entity.base';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class IdResponseDto {
  @Exclude()
  private readonly _id: AggregateID;

  constructor(id: AggregateID) {
    this._id = id;
  }

  @ApiProperty({
    type: String,
    example: '554965628120837912',
    description: '고유 ID',
  })
  @Expose()
  get id(): AggregateID {
    return this._id;
  }
}
