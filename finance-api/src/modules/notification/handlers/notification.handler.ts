import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationHandler {
  @OnEvent('User.created')
  handleUserCreated(payload: any) {
    console.log(payload);
  }

  @OnEvent('Wallet.created')
  handleWalletCreated(payload: any) {
    console.log(payload);
  }
}
