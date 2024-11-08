import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { Repository } from "typeorm";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashingService } from "./hashing/hashing.service";
import jwtConfig from "./config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Pessoa)
        private readonly pessoaRepository: Repository<Pessoa>,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}

    async login(loginDto: LoginDto) {
        let passwordIsValid = false;
        let throwError = true;
        const pessoa = await this.pessoaRepository.findOneBy({email: loginDto.email, isActive: true})
        if (pessoa)
            passwordIsValid = await this.hashingService.compare(loginDto.password, pessoa.passwordHash);
        if (passwordIsValid)
            throwError = false;
        if (throwError)
            throw new UnauthorizedException('Usuário não autorizado.');
        return this.createTokens(pessoa);
    }

    private async createTokens(pessoa: Pessoa) {
        const accessTokenPromise = this.signJwtAsync(pessoa.id, this.jwtConfiguration.jwtexpire, {email: pessoa.email, nome: pessoa.nome});
        const refreshTokenPromise = this.signJwtAsync(pessoa.id, this.jwtConfiguration.jwtRefreshExpire);
        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);
        return {accessToken, refreshToken};
    }

    private async signJwtAsync<T>(sub: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync({
            sub,
            ...payload
        },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: expiresIn
            });
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const {sub} = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, this.jwtConfiguration);
            const pessoa = await this.pessoaRepository.findOneBy({id: sub, isActive: true});
            if (!pessoa) 
                throw new Error('Usuário não autorizado.');
            return this.createTokens(pessoa);
        } catch(error) {
            throw new UnauthorizedException(error.message);
        }
    }


}