import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export class AddHeaderInterceptor implements NestInterceptor {

    // context: dá informação sobre onde as requisições são realizadas
    // next: organiza as chamadas de execução
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();
        response.setHeader('X-Custom-Header', 'O valor do cabeçalho');
        return next.handle(); // Faz nada
    }

}