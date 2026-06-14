import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderTypeEnum } from '../enums/order-type.enum';
import { StatusEnum } from '../enums/status.enum';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID do usuário dono da ordem',
    example: 'cm7jf8x9w0000abc123def456',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'ID do ativo negociado',
    example: 'cm7jf8x9w0000abc123def789',
  })
  @IsString()
  @IsNotEmpty()
  assetId!: string;

  @ApiProperty({
    description: 'Valor total da ordem (quantity * price)',
    example: 1500.0,
  })
  @IsNumber()
  @IsNotEmpty()
  totalPrice!: number;

  @ApiProperty({
    description: 'Status da ordem',
    enum: StatusEnum,
    example: StatusEnum.PENDING,
  })
  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status!: StatusEnum;

  @ApiProperty({
    description: 'Tipo da ordem (compra ou venda)',
    enum: OrderTypeEnum,
    example: OrderTypeEnum.BUY,
  })
  @IsEnum(OrderTypeEnum)
  @IsNotEmpty()
  type!: OrderTypeEnum;
}
