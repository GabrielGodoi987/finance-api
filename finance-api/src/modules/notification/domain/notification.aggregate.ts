import { AggregateBase } from "../../../commons/lib/aggregate.base";

export class NotificationAggregate extends AggregateBase {
  private id: string;
  private userId: string;
  private type: string;
  private title: string;
  private content: string;
  private aggregateId: string;
  private readAt: Date | null;

  private constructor(
    id: string,
    userId: string,
    type: string,
    title: string,
    content: string,
    aggregateId: string,
    readAt: Date | null,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.title = title;
    this.content = content;
    this.aggregateId = aggregateId;
    this.readAt = readAt;
  }

  static create(
    userId: string,
    type: string,
    title: string,
    content: string,
    aggregateId: string,
  ): NotificationAggregate {
    const id = crypto.randomUUID();
    return new NotificationAggregate(
      id,
      userId,
      type,
      title,
      content,
      aggregateId,
      null,
    );
  }

  static fromPersistence(data: {
    id: string;
    userId: string;
    type: string;
    title: string;
    content: string;
    aggregateId: string;
    createdAt: Date;
    updatedAt: Date;
    readAt: Date | null;
  }): NotificationAggregate {
    const entity = new NotificationAggregate(
      data.id,
      data.userId,
      data.type,
      data.title,
      data.content,
      data.aggregateId,
      data.readAt,
    );
    entity.setCreatedAt(data.createdAt);
    entity.setUpdatedAt(data.updatedAt);
    return entity;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getType(): string {
    return this.type;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getAggregateId(): string {
    return this.aggregateId;
  }

  getReadAt(): Date | null {
    return this.readAt;
  }

  isRead(): boolean {
    return this.readAt !== null;
  }

  markAsRead(): void {
    this.readAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      title: this.title,
      content: this.content,
      aggregateId: this.aggregateId,
      readAt: this.readAt,
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
