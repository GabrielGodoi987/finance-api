import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @ApiPropertyOptional({
    description: 'ID do ativo (gerado automaticamente se omitido)',
    example: 'cm7jf8x9w0000abc123def456',
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Símbolo do ativo (apenas letras maiúsculas e números)',
    example: 'PETR4',
  })
  @IsString()
  @IsNotEmpty()
  symbol!: string;

  @ApiProperty({
    description: 'Preço atual do ativo em reais (BRL)',
    example: 35.5,
  })
  @IsNumber()
  @IsNotEmpty()
  price!: number;
}
