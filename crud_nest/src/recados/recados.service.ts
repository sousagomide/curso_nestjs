import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService
  ) {}

  async findAll() {
    const recados = await this.recadoRepository.find({
      relations: ['de', 'para'],
      select: {
        de: {id: true, nome: true},
        para: {id: true, nome: true}
      }
    });
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({ 
      where: { id },
      relations: ['de', 'para'],
      select: {
        de: {id: true, nome: true},
        para: {id: true, nome: true}
      } 
    });
    if (recado) return recado;
    // throw new HttpException('Recado não encontrado.', HttpStatus.NOT_FOUND)
    throw new NotFoundException('Recado não encontrado.');
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const {deId, paraId} = createRecadoDto;
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);
    
    const newRecado = { 
      texto: createRecadoDto.texto, 
      lido: false, 
      data: new Date(),
      de,
      para
    };
    const recado = this.recadoRepository.create(newRecado);
    await this.recadoRepository.save(recado);
    return {
      ...recado,
      de: {id: recado.de.id},
      para: {id: recado.para.id}
    }
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
