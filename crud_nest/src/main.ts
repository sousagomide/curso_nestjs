import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  // helmet -> adiciona cabeçalhos de segurança no protocolo HTTP
  // cors -> permite que outro domínio faça requests na aplicação
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.enableCors({
      origin: 'https://eaprendizapp.com.br/'
    });
  }

  const documentBuilder = new DocumentBuilder().setTitle('Recados API').setDescription('Envio de recados').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
