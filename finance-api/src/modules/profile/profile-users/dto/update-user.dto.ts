import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'ID do usuário a ser atualizado',
    example: 'cm7jf8x9w0000abc123def456',
  })
  @IsNotEmpty()
  @IsString()
  id!: string;
}
