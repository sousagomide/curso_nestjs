import { Injectable } from '@nestjs/common';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'First',
      de: 'Denecley Alvim',
      para: 'Nanaxara',
      lido: false,
      data: new Date(),
    },
  ];

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    return this.recados.find(item => item.id === +id);
  }

  create(createRecadoDto: any) {
    this.lastId++;
    const id = this.lastId;
    const newRecado = { id, ...createRecadoDto };
    this.recados.push(newRecado);
    return newRecado;
  }

  update(id: string, updateRecadoDto: any) {
    const recadoExistenteIndex = this.recados.findIndex(
      item => item.id === +id,
    );
    if (recadoExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadoExistenteIndex];
      this.recados[recadoExistenteIndex] = {
        ...recadoExistente,
        ...updateRecadoDto,
      };
      return this.recados[recadoExistenteIndex];
    }
  }

  remove(id: string) {
    const recadoExistenteIndex = this.recados.findIndex(
      item => item.id === +id,
    );
    if (recadoExistenteIndex >= 0)
      return this.recados.splice(recadoExistenteIndex, 1);
  }
}
