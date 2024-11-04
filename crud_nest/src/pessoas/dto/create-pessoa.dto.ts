import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePessoaDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  // @IsStrongPassword({minLength: 5})
  @MinLength(5)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  readonly nome: string;
}
