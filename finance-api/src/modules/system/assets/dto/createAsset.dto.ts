import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  symbol!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;
}
