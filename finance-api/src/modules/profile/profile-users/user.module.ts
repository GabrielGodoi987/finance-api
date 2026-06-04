import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SharedModule } from '../../shared/shared.module';
import { UserRepositoryImpl } from './infra/repositories/user.repositoryImpl.prisma';
import { CreateUseCase } from './use-case/create.use-case';
import { RequestDeactivationUseCase } from './use-case/reuqest-deactivate';
import { UpdateUseCase } from './use-case/update.use-case';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [UserController],
  providers: [
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    CreateUseCase,
    UpdateUseCase,
    RequestDeactivationUseCase,
  ],
  exports: [UserRepositoryImpl],
})
export class UserModule {}
