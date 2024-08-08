import { DomainEvent, DomainEventProps } from '@libs/ddd/base-domain.event';
import { IEvent } from '@nestjs/cqrs';
import { RolesEnum } from '@src/apis/users/const/roles.const';

export class UserCreatedDomainEvent extends DomainEvent implements IEvent {
  readonly nickname: string;
  readonly email: string;
  readonly password: string;
  readonly role: RolesEnum;

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);

    const { nickname, email, password, role } = props;

    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
