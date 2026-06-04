import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user-repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserDto: UpdateUserDto) {
    const { id, email, name, password, document } = updateUserDto;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (email && email !== user.getEmail()) {
      const emailAlreadyExists = await this.userRepository.findByEmail(email);

      if (emailAlreadyExists) {
        throw new BadRequestException('Email already in use');
      }
    }

    user.update({ name, email, password, document });

    const updatedUser = await this.userRepository.save(user);

    return updatedUser.toJSON();
  }
}
