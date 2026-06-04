import { Module } from '@nestjs/common';
import { UserModule } from './profile-users/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({ imports: [UserModule, WalletModule] })
export class ProfileModule {}
