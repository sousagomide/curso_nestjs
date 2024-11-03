import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  home(): string {
    return 'Tela principal do conceitos-automatico';
  }
}
