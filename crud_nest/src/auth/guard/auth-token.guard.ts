import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { REQUEST_TOKEN_PAYLOAD_KEY } from "../auth.constants";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";

@Injectable()
export class AuthTokenGuard implements CanActivate{

    constructor(
        @InjectRepository(Pessoa)
        private readonly pessoaRepository: Repository<Pessoa>,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new UnauthorizedException('Não logado!');
        try {
            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);
            const pessoa = await this.pessoaRepository.findOneBy({id: payload.sub, isActive: true});
            if (!pessoa)
                throw new UnauthorizedException('Usuário não autorizado.');
            payload['pessoa'] = pessoa;
            request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
        } catch(error) {
            throw new UnauthorizedException('Falha ao logar!');
        }
        return true;
    }

    extractTokenFromHeader(request: Request): string | undefined {
        const authorization = request.headers?.authorization;
        if (!authorization || typeof authorization !== 'string')
            return
        return authorization.split(' ')[1];
    }

}