import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationAggregate } from '../domain/notification.aggregate';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class NotificationHandler {
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @OnEvent('User.created')
  async handleUserCreated(payload: any) {
    const data = this.parseRawData(payload.rawData);
    const notification = NotificationAggregate.create(
      payload.aggregateId,
      'USER_CREATED',
      'Welcome!',
      `User ${data.name} created successfully`,
      payload.aggregateId,
    );
    await this.notificationRepository.save(notification);
  }

  @OnEvent('Wallet.created')
  async handleWalletCreated(payload: any) {
    const data = this.parseRawData(payload.rawData);
    const notification = NotificationAggregate.create(
      data.userId,
      'WALLET_CREATED',
      'Wallet Created',
      `Wallet created with balance $${data.balance}`,
      payload.aggregateId,
    );
    await this.notificationRepository.save(notification);
  }

  private parseRawData(rawData: string): any {
    return typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
  }
}
