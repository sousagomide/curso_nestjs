import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  // context: dá informação sobre onde as requisições são realizadas
  // next: organiza as chamadas de execução
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token || token != '123456') {
      throw new UnauthorizedException(
        'Usuário não tem permissão para acessar esse recurso.',
      );
    }
    return next.handle();
  }
}
