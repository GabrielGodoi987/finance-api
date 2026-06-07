import { Body, Get, Param, Patch, Put, Query } from '@nestjs/common';
import { ApplicationController } from '../../commons/decorators/application/application.decorator';
import { CurrentUser } from '../../commons/decorators/current-user/current-user.decorator';
import { FindNotificationDto } from './dto/find-notification.dto';
import { MarkReadDto } from './dto/mark-read.dto';
import { FindAllUseCase } from './use-cases/find-all.use-case';
import { FindOneByEmailUseCase } from './use-cases/find-one-by-email.use-case';
import { MarkAllAsReadUseCase } from './use-cases/mark-all-as-read.use-case';
import { MarkOneAsReadUseCase } from './use-cases/mark-one-as-read.use-case';

@ApplicationController('notification')
export class NotificationController {
  constructor(
    private readonly findAllUseCase: FindAllUseCase,
    private readonly findOneNotificationByEmail: FindOneByEmailUseCase,
    private readonly markOneAsReadUseCase: MarkOneAsReadUseCase,
    private readonly markAllAsReadUseCase: MarkAllAsReadUseCase,
  ) {}

  @Get('user/notifications')
  async findAll(@Query() query: FindNotificationDto) {
    return await this.findAllUseCase.execute({
      ...query,
    });
  }

  @Get('user/:notificationId')
  async findOne(
    @CurrentUser() user: { userId: string },
    @Param('notificationId') notificationId: string,
  ) {
    return await this.findOneNotificationByEmail.execute({
      id: notificationId,
      userId: user.userId,
    });
  }

  @Patch('user/:email/read/:notificationId')
  async markOneAsRead(
    @Param('email') email: string,
    @CurrentUser() user: { userId: string },
    @Param('notificationId') notificationId: string,
  ) {
    return await this.markOneAsReadUseCase.execute({ notificationId, email });
  }

  @Put('user/:email/read-all')
  async markAllAsRead(
    @Param('email') email: string,
    @CurrentUser() user: { userId: string },
    @Body() markReadDto: MarkReadDto,
  ) {
    return await this.markAllAsReadUseCase.execute({
      userId: user.userId,
      markReadDto,
    });
  }
}
