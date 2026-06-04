import { Body, Patch, Post } from '@nestjs/common';
import { ApplicationController } from '../../../commons/decorators/application/application.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUseCase } from './use-case/create.use-case';

@ApplicationController('/client/users')
export class UserController {
  constructor(private readonly createUseCase: CreateUseCase) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUseCase.execute(createUserDto);
  }

  @Patch()
  update() {}

  @Post()
  requestCancelationProfile() {}
}
