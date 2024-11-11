import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @ApiProperty({
    example: 'Este é um recado de exemplo',
    description: 'O conteúdo textaul do recado',
    minLength: 5,
    maxLength: 255
  })
  @IsString({
    message: 'Texto precisa ser uma string',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  // @IsPositive()
  // deId: number;

  @IsPositive()
  paraId: number;
}
