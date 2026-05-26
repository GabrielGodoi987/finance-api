import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  symbol!: string;

  @IsOptional()
  @IsArray()
  order?: string[];
}
