import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { Repository } from "typeorm";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashingService } from "./hashing/hashing.service";
import jwtConfig from "./config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

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
        const pessoa = await this.pessoaRepository.findOneBy({email: loginDto.email})
        if (pessoa)
            passwordIsValid = await this.hashingService.compare(loginDto.password, pessoa.passwordHash);
        if (passwordIsValid)
            throwError = false;
        if (throwError)
            throw new UnauthorizedException('Usuário ou senha inválido.');
        
        const accessToken = await this.jwtService.signAsync({
            sub: pessoa.id,
            email: pessoa.email,
            nome: pessoa.nome
        }, 
        {
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            secret: this.jwtConfiguration.secret,
            expiresIn: this.jwtConfiguration.jwtexpire
        });
        
        
        return {accessToken};
    }


}