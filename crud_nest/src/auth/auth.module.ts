import { Global, Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthTokenGuard } from "./guard/auth-token.guard";
import { AuthAndPolicyGuard } from "./guard/auth-and-policy.guard";
import { RoutePolicyGuard } from "./guard/route-policy.guard";

@Global() //Não precisa importar o módulo em outros para usar
@Module({
    controllers: [
        AuthController
    ],
    imports: [
        TypeOrmModule.forFeature([Pessoa]),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider())
    ],    
    providers: [
        AuthService,
        AuthTokenGuard,
        RoutePolicyGuard,
        {
            provide: HashingService,
            useClass: BcryptService
        }
    ],
    exports: [
        JwtModule,
        ConfigModule,
        TypeOrmModule,
        {
            provide: HashingService,
            useClass: BcryptService
        },
        AuthTokenGuard,
        RoutePolicyGuard
    ]
})
export class AuthModule {}