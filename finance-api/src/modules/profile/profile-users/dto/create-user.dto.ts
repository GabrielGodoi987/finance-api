import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Senha forte do usuário',
    example: 'Str0ng!Pass123',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;

  @ApiProperty({
    description: 'Documento (CPF, CNPJ, SSN, EIN ou NIF)',
    example: '12345678901',
  })
  @IsNotEmpty()
  @IsString()
  document!: string;
}
