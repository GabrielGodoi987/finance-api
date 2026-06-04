import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserRepositoryImpl } from './infra/repositories/user.repositoryImpl.prisma';
import { CreateUseCase } from './use-case/create.use-case';
import { RequestDeactivation } from './use-case/reuqest-deactivate';
import { UpdateUseCase } from './use-case/update.use-case';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [UserController],
  providers: [
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    CreateUseCase,
    UpdateUseCase,
    RequestDeactivation,
  ],
  exports: [UserRepositoryImpl],
})
export class UserModule {}
