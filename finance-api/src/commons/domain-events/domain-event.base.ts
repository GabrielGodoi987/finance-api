import { v4 } from 'uuid';
export abstract class DomainEventBase {
  private id: string;
  private eventName: string;
  private aggreagteId: string;
  private aggregateType: string;
  private rawData: any;
  private occurredAt: Date;

  constructor(
    eventName: string,
    aggregateId: string,
    aggregateType: string,
    rawData: any,
  ) {
    this.id = v4();
    this.eventName = eventName;
    this.aggreagteId = aggregateId;
    this.aggregateType = aggregateType;
    this.rawData = rawData;
    this.occurredAt = new Date();
  }

  getId(): string {
    return this.id;
  }

  getEventName(): string {
    return this.eventName;
  }

  getAggregateId(): string {
    return this.aggreagteId;
  }

  getRawData(): string {
    return JSON.stringify(this.rawData, null, 2);
  }

  getAggregateType(): string {
    return this.aggregateType;
  }

  getOccurredAt(): Date {
    return this.occurredAt;
  }
}
