import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StatusEnum } from '../enums/Satatus.enum';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty() 
  asset_id: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;
}
