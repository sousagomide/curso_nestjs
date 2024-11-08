export class TokenPayloadDto {
    sub: number;
    email: string;
    nome: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
}