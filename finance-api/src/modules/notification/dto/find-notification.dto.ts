import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindNotificationDto {
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsOptional()
  @IsNumber()
  page: number = 0;

  @IsOptional()
  @IsNumber()
  limit: number = 10;
}
