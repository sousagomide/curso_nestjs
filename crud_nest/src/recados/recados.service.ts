import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({ where: { id } });
    if (recado) return recado;
    // throw new HttpException('Recado não encontrado.', HttpStatus.NOT_FOUND)
    throw new NotFoundException('Recado não encontrado.');
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const newRecado = { ...createRecadoDto, lido: false, data: new Date() };
    const recado = this.recadoRepository.create(newRecado);
    return this.recadoRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });
    if (recado) return await this.recadoRepository.save(recado);
    throw new NotFoundException('Recado não encontrado.');
  }

  async remove(id: number) {
    const recado = await this.findOne(id);
    // const recado = await this.recadoRepository.findOneBy({id});
    if (recado) return await this.recadoRepository.remove(recado);
    throw new NotFoundException('Recado não encontrado.');
  }
}
