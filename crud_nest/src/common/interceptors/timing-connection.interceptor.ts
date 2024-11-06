import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  // context: dá informação sobre onde as requisições são realizadas
  // next: organiza as chamadas de execução
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // const now = Date.now();
    // console.log('TimingConnectionInterceptor before...');
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // a seguir o código executa um bloco após a finalização do método
    return next.handle().pipe(
      // para pegar a respostas adicione a propriedade data na função tap
      tap(() => {
        // const elapsed = Date.now() - now;
        // console.log('TimingConnectionInterceptor after...');
        // console.log(elapsed);
      }),
    );
  }
}
