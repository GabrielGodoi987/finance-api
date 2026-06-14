import { Module, Scope } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SharedModule } from '../../shared/shared.module';
import { UserRepositoryImpl } from './infra/repositories/user.repositoryImpl.prisma';
import { UserDocumentPipe } from './pipes/user-document.pipe';
import { CreateUseCase } from './use-case/create.use-case';
import { RequestDeactivationUseCase } from './use-case/request-deactivation.use-case';
import { UpdateUseCase } from './use-case/update.use-case';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [UserController],
  providers: [
    UserRepositoryImpl,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    CreateUseCase,
    UpdateUseCase,
    RequestDeactivationUseCase,
    {
      provide: UserDocumentPipe,
      useClass: UserDocumentPipe,
      scope: Scope.REQUEST,
    },
  ],
  exports: [UserRepositoryImpl, UserDocumentPipe],
})
export class UserModule {}
