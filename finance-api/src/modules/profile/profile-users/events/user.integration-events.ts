import { DomainEventBase } from '../../../../commons/domain-events/domain-event.base';

export class UserCreatedEvent extends DomainEventBase {
  constructor(aggregateId: string, rawData: any) {
    super('User.created', aggregateId, UserCreatedEvent.name, rawData);
  }
}

export class WalletCreatedEvent extends DomainEventBase {
  constructor(aggregateId: string, rawData: any) {
    super('Wallet.created', aggregateId, WalletCreatedEvent.name, rawData);
  }
}
