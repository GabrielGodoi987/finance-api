import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EventBus } from './event-bus.service';
import { EventBroker } from './event-broker.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'events' }),
  ],
  providers: [EventBus, EventBroker],
  exports: [EventBus],
})
export class EventBusModule {}
