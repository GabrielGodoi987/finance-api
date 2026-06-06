import { Inject, Injectable } from '@nestjs/common';
import { NotificationRepository } from '../domain/repositories/notification.repository';
import { MarkReadDto } from '../dto/mark-read.dto';

@Injectable()
export class MarkAllAsReadUseCase {
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    email,
    markReadDto,
  }: {
    email: string;
    markReadDto: MarkReadDto;
  }) {
    return { markReadDto, email };
  }
}
