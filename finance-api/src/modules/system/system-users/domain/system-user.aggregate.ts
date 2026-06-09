import { AggregateBase } from '../../../../commons/lib/aggregate.base';

export class SystemUserAggregate extends AggregateBase {
  constructor(createdAt: Date, updatedAt: Date) {
    super(createdAt, updatedAt);
  }

  toJSON(): string {
    return ``;
  }
}
