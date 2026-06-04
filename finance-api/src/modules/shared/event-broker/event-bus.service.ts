import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { DomainEventBase } from '../../../commons/domain-events/domain-event.base';

@Injectable()
export class EventBus {
  constructor(@InjectQueue('events') private readonly eventsQueue: Queue) {}

  async publish(events: DomainEventBase[]): Promise<void> {
    for (const event of events) {
      await this.eventsQueue.add(event.getEventName(), {
        aggregateId: event.getAggregateId(),
        aggregateType: event.getAggregateType(),
        eventName: event.getEventName(),
        rawData: event.getRawData(),
        occurredAt: event.getOccurredAt(),
      });
    }
  }
}
