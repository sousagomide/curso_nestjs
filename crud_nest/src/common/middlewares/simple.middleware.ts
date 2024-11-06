import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware initializing...');
    // Terminando a cadeia de chamadas
    // return res.status(404).send({
    //     message: 'Não encontrado'
    // });
    const authorization = req.headers?.authorization;
    if (authorization) {
      req['user'] = {
        nome: 'Rodrigo',
        sobrenome: 'Gomide',
        role: 'admin',
      };
    }
    // if (!authorization)
    //     throw new BadGatewayException('Bla Bla');

    res.setHeader('CABECALHO', 'Do Middleware');
    next();
    console.log('SimpleMiddleware ending...');
    res.on('finish', () => {
      console.log('Conexão encerrada...');
    });
  }
}
