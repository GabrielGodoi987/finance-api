import { BadRequestException, Inject } from '@nestjs/common';
import { v4 } from 'uuid';
import { UserRole } from '../../../../domain/value-objects/user-role.enum';
import { EventBus } from '../../../shared/event-broker/event-bus.service';
import { UserRepository } from '../domain/repositories/user-repository';
import { UserAggregate } from '../domain/user.aggregate';
import { CreateUserDto } from '../dto/create-user.dto';

export class CreateUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const { name, email, password, document } = createUserDto;
    const doesUserAlreadyExists = await this.userRepository.findByEmail(email);

    if (doesUserAlreadyExists) {
      throw new BadRequestException('User already exists');
    }

    try {
      const userAggregate = UserAggregate.create(
        v4(),
        name,
        email,
        password,
        document,
        UserRole.CLIENT,
      );

      await this.userRepository.save(userAggregate);

      const events = userAggregate.getEvents();

      await this.eventBus.publish(events);

      userAggregate.cleanEvents();

      return { message: 'User successfully created' };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
