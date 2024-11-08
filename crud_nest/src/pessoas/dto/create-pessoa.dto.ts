import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoutePolicies } from 'src/auth/enum/route-policies.enum';

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

  @IsEnum(RoutePolicies, { each: true })
  routePolicies: RoutePolicies[];
}
