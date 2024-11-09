import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

import * as path from 'path';
import * as fs from 'fs/promises';
import toStream = require('buffer-to-stream');


// Usa por padrão scope: Scope.DEFAULT
// Scope.DEFAULT -> Usa um padrão singleton onde só uma instância é criada
// Scope.REQUEST -> O provider é instanciado a cada requisição
// Scope.TRANSIENT -> O provider é criada uma instância do provider para cada classe que injetar esse provider
@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingService
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const passwordHash = await this.hashingService.hash(createPessoaDto.password);
      const pessoaDto = {
        nome: createPessoaDto.nome,
        passwordHash: passwordHash,
        email: createPessoaDto.email,
        routePolicies: createPessoaDto.routePolicies
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
      select: {
        email: true,
        nome: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return pessoas;
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({ where: { id } });
    if (pessoa) return pessoa;
    throw new NotFoundException('Pessoa não encontrada.');
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto, tokenPayload: TokenPayloadDto) {
    const pessoaDto = {
      nome: updatePessoaDto?.nome
    };
    if (updatePessoaDto?.password) {
      const passwordHash = await this.hashingService.hash(updatePessoaDto.password);
      pessoaDto['passwordHash'] = passwordHash;
    }
    const pessoa = await this.pessoaRepository.preload({ id, ...pessoaDto });
    if (pessoa.id !== tokenPayload.sub)
      throw new ForbiddenException('Você não tem permissão para atualizar esse dados!');
    if (pessoa) return this.pessoaRepository.save(pessoa);
    throw new NotFoundException('Pessoa não encontrada.');
  }

  async remove(id: number, tokenPayload: TokenPayloadDto) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa)
      throw new NotFoundException('Pessoa não encontrada.');
    if (pessoa.id !== tokenPayload.sub)
      throw new ForbiddenException('Você não tem permissão para atualizar esse dados!');
    return this.pessoaRepository.remove(pessoa);
  }

  async uploadPicture(file: Express.Multer.File, tokenPayload: TokenPayloadDto) {
    const pessoa = await this.findOne(tokenPayload.sub);
    const fileExtension = path.extname(file.originalname).toLowerCase().substring(1);
    const fileName = `${tokenPayload.sub}.${fileExtension}`;
    const fileFullPath = path.resolve(process.cwd(), 'pictures', fileName);
    await fs.writeFile(fileFullPath, file.buffer);
    pessoa.picture = fileName;
    this.pessoaRepository.save(pessoa);
    return {
      "fieldname": file.fieldname,
      "originalname": file.originalname,
      "mimetype": file.mimetype,
      "buffer": {},
      "size": file.size
    }
  }


  async uploadImageCloudinary(file: Express.Multer.File, tokenPayload: TokenPayloadDto) {
    const pessoa = await this.findOne(tokenPayload.sub);
    await v2.uploader.destroy(pessoa.picture);
    const image = this.sendImage(file, tokenPayload);
    const imageName = (await image).public_id;
    pessoa.picture = imageName;
    this.pessoaRepository.save(pessoa);
    return image;
  }


  async sendImage(file: Express.Multer.File, tokenPayload: TokenPayloadDto): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}