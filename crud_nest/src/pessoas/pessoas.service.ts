import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

// Usa por padrão scope: Scope.DEFAULT
// Scope.DEFAULT -> Usa um padrão singleton onde só uma instância é criada
// Scope.REQUEST -> O provider é instanciado a cada requisição
// Scope.TRANSIENT -> O provider é criada uma instância do provider para cada classe que injetar esse provider
@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoaDto = {
        nome: createPessoaDto.nome,
        passwordHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };
      const novaPessoa = this.pessoaRepository.create(pessoaDto);
      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('E-mail já está cadastrado.');
      throw error;
    }
  }

  async findAll() {
    const pessoas = await this.pessoaRepository.find({
      order: { nome: 'asc' },
    });
    return pessoas;
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({ where: { id } });
    if (pessoa) return pessoa;
    throw new NotFoundException('Pessoa não encontrada.');
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoaDto = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password,
    };
    const pessoa = await this.pessoaRepository.preload({ id, ...pessoaDto });
    if (pessoa) return this.pessoaRepository.save(pessoa);
    throw new NotFoundException('Pessoa não encontrada.');
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (pessoa) return this.pessoaRepository.remove(pessoa);
    throw new NotFoundException('Pessoa não encontrada.');
  }
}
