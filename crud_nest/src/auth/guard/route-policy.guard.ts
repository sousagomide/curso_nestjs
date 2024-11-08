import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { REQUEST_TOKEN_PAYLOAD_KEY, ROUTE_POLICY_KEY } from "../auth.constants";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Reflector } from "@nestjs/core";
import { RoutePolicies } from "../enum/route-policies.enum";

@Injectable()
export class RoutePolicyGuard implements CanActivate{

    constructor(
        private readonly reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const routePolicyRequired = this.reflector.get<RoutePolicies | undefined>(ROUTE_POLICY_KEY, context.getHandler());
        if (!routePolicyRequired) return true; // Usado para rota pública
        const request = context.switchToHttp().getRequest();
        const tokenPayload = request[REQUEST_TOKEN_PAYLOAD_KEY];
        if (!tokenPayload)
            throw new UnauthorizedException(`Rota requer permissão ${routePolicyRequired}. Usuário não logado.`);
        const { pessoa }: {pessoa: Pessoa} = tokenPayload;
        if (!pessoa.routePolicies.includes(routePolicyRequired))
            throw new UnauthorizedException(`Rota requer permissão ${routePolicyRequired}.`);
        return true;
    }

}