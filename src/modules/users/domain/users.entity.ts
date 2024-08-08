import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { UserCreatedDomainEvent } from '@modules/users/domain/events/user-created.domain-event';
import { getTsid } from 'tsid-ts';
import bcrypt from 'bcrypt';
import {
  UserProps,
  CreateUserProps,
} from '@modules/users/domain/users.entity-interface';
import { UserRole } from '@modules/users/const/users.const';

export class UserEntity extends AggregateRoot<UserProps> {
  static create(create: CreateUserProps) {
    const id = getTsid().toBigInt();

    const props: UserProps = {
      ...create,
      role: UserRole.USER,
      followeeCount: 0,
      followerCount: 0,
    };
    const user = new UserEntity({ id, props });

    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        ...props,
      }),
    );
  }

  private hashPassword(password: string) {
    bcrypt;
  }

  public validate(): void {}
}
