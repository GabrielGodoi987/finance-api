import { IsArray, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAssetDto{
    @IsString()
    @IsNotEmpty()
    id: string
    
    @IsString()
    @IsNotEmpty()
    symbol: string

    @IsOptional()
    @IsArray()
    @IsEmpty()
    order: string[]
}