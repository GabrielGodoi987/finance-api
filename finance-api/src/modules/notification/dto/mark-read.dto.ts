import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class MarkReadDto {
  @ApiProperty({
    description: 'IDs das notificações a serem marcadas como lidas',
    example: ['cm7jf8x9w0000abc123def456', 'cm7jf8x9w0000abc123def457'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids!: string[];
}
