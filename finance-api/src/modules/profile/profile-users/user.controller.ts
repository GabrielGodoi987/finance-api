import { Body, Param, Patch, Post } from '@nestjs/common';
import { ApplicationController } from '../../../commons/decorators/application/application.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUseCase } from './use-case/create.use-case';
import { RequestDeactivationUseCase } from './use-case/reuqest-deactivate';
import { UpdateUseCase } from './use-case/update.use-case';

@ApplicationController('/client/users')
export class UserController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly requestDeactivationUseCase: RequestDeactivationUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUseCase.execute(createUserDto);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.updateUseCase.execute(updateUserDto);
  }

  @Post('/id')
  requestDeactivation(@Param('id') id: string) {
    return this.requestDeactivationUseCase.execute(id);
  }
}
