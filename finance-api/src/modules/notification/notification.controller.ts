import { Body, Param, Query } from '@nestjs/common';
import { ApplicationController } from '../../commons/decorators/application/application.decorator';
import { CurrentUser } from '../../commons/decorators/current-user/current-user.decorator';
import { GetRoute } from '../../commons/decorators/application/controller/get-route.decorator';
import { PatchRoute } from '../../commons/decorators/application/controller/patch-route.decorator';
import { PutRoute } from '../../commons/decorators/application/controller/put-route.decorator';
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

  @GetRoute('user/notifications', {}, { status: 200, description: 'Lista todas as notificações do usuário' })
  async findAll(@Query() query: FindNotificationDto) {
    return await this.findAllUseCase.execute({
      ...query,
    });
  }

  @GetRoute('user/:notificationId', {}, { status: 200, description: 'Obtém uma notificação específica' })
  async findOne(
    @CurrentUser() user: { userId: string },
    @Param('notificationId') notificationId: string,
  ) {
    return await this.findOneNotificationByEmail.execute({
      id: notificationId,
      userId: user.userId,
    });
  }

  @PatchRoute('user/:email/read/:notificationId', {}, { status: 200, description: 'Marca uma notificação como lida' })
  async markOneAsRead(
    @Param('email') email: string,
    @CurrentUser() user: { userId: string },
    @Param('notificationId') notificationId: string,
  ) {
    return await this.markOneAsReadUseCase.execute({ notificationId, email });
  }

  @PutRoute('user/:email/read-all', { type: MarkReadDto }, { status: 200, description: 'Marca todas as notificações como lidas' })
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
