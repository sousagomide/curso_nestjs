import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @IsString({
    message: 'Texto precisa ser uma string',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @IsPositive()
  deId: number;

  @IsPositive()
  paraId: number;
}
