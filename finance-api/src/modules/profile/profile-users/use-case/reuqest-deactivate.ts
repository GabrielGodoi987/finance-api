import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user-repository';

@Injectable()
export class RequestDeactivationUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository
  ) { }

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.requestDeactivation();

    await this.userRepository.save(user);

    return { message: 'Deactivation requested successfully' };
  }
}
