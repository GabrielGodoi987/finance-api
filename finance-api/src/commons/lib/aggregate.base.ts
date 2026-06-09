import { DomainEventBase } from '../domain-events/domain-event.base';

export abstract class AggregateBase {
  private events: DomainEventBase[] = [];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(createdAt: Date, updatedAt: Date) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  addEvent(event: DomainEventBase) {
    this.events.push(event);
  }

  getEvents(): DomainEventBase[] {
    return this.events;
  }

  cleanEvents(): void {
    this.events = [];
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  abstract toJSON(): any;
}
