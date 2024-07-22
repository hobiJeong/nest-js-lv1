import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { AggregateID, CreateEntityProps } from '@libs/ddd/entity.base';
import { RolesEnum } from '@src/apis/users/const/roles.const';
import { UserCreatedDomainEvent } from '@src/apis/users/domain/events/user-created.domain-event';
import { CreateUserProps, UserProps } from '@src/apis/users/types/users.type';
import { getTsid } from 'tsid-ts';
import bcrypt from 'bcrypt';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  constructor(props: CreateEntityProps<UserProps>) {
    super(props);
  }

  static create(create: CreateUserProps) {
    const id = getTsid().toBigInt();

    const props: UserProps = {
      ...create,
      role: RolesEnum.USER,
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
