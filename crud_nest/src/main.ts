import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Método usado para validar as entradas de dados do usuário no sistema
  // Também previne injeção de dados
  // Transforma a conversão dos tipos de dados dos parâmetros e DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
    new ParseIntIdPipe(),
  );
  // app.useGlobalInterceptors(
  //   new AddHeaderInterceptor()
  // );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
