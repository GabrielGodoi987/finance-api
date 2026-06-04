import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StatusEnum } from '../enums/Satatus.enum';
import { OrderTypeEnum } from '../enums/order-type.enum';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  assetId!: string;

  @IsNumber()
  @IsNotEmpty()
  totalPrice!: number;

  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status!: StatusEnum;

  @IsEnum(OrderTypeEnum)
  @IsNotEmpty()
  type!: OrderTypeEnum;
}
