import { Body, Param } from '@nestjs/common';
import { ApplicationController } from '../../../commons/decorators/application/application.decorator';
import { PatchRoute } from '../../../commons/decorators/application/controller/patch-route.decorator';
import { PostRoute } from '../../../commons/decorators/application/controller/post-route.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocumentPipe } from './pipes/user-document.pipe';
import { CreateUseCase } from './use-case/create.use-case';
import { RequestDeactivationUseCase } from './use-case/request-deactivation.use-case';
import { UpdateUseCase } from './use-case/update.use-case';

@ApplicationController('client/users')
export class UserController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly requestDeactivationUseCase: RequestDeactivationUseCase,
  ) {}

  @PostRoute(
    '',
    { type: CreateUserDto },
    { status: 201, description: 'Usuário criado com sucesso' },
  )
  create(
    @Body() createUserDto: CreateUserDto,
    @Body('document', UserDocumentPipe)
    documentInfo: { document: string; country: string },
  ) {
    return this.createUseCase.execute({
      ...createUserDto,
      document: documentInfo.document,
    });
  }

  @PatchRoute(
    ':id',
    { type: UpdateUserDto },
    { status: 200, description: 'Usuário atualizado com sucesso' },
  )
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUseCase.execute({ ...updateUserDto, id });
  }

  @PostRoute(
    ':id/deactivation',
    {},
    { status: 200, description: 'Solicitação de desativação enviada' },
  )
  requestDeactivation(@Param('id') id: string) {
    return this.requestDeactivationUseCase.execute(id);
  }
}
