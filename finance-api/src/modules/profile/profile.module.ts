import { Module } from '@nestjs/common';
import { HoldingModule } from './holdings/holding.module';
import { UserModule } from './profile-users/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({ imports: [UserModule, WalletModule, HoldingModule] })
export class ProfileModule {}
