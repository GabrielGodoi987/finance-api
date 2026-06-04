import { DomainEventBase } from '../../../../commons/domain-events/domain-event.base';

export class SystemUserCreatedEvent extends DomainEventBase {
  constructor(aggregateId: string, aggregateType: string, rawData: string) {
    super('SystemUser.created', aggregateId, aggregateType, rawData);
  }
}

export class SystemUserCreationgFailedEvent extends DomainEventBase {
  constructor(aggregateId: string, aggregateType: string, rawData: string) {
    super('SystemUser.creation.failed', aggregateId, aggregateType, rawData);
  }
}
