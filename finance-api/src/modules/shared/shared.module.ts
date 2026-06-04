import { Module } from '@nestjs/common';
import { EventBusModule } from './event-broker/event-bus.module';

@Module({ imports: [EventBusModule], exports: [EventBusModule] })
export class SharedModule {}
