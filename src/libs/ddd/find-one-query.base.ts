import { ArgumentNotProvidedException } from '@libs/exceptions/exceptions';
import { Guard } from '@libs/guard';

export class FindOneQuery {
  /**
   * @description FindOneQuery 기본 필드
   */
  readonly id: bigint;

  constructor(props: FindOneQuery) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'FindOneQuery props should not be empty',
      );
    }
    this.id = props.id;
  }
}
