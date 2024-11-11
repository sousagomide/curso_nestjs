import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RecadoUtils } from './recados.utils';
import recadosConfig from './recados.config';
import { ConfigType } from '@nestjs/config';
import globalConfig from 'src/global-config/global.config';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { EmailService } from 'src/email/email.service';
import { ResponseRecadoDto } from './dto/response-recado.dto';


@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
    private readonly recadosUtils: RecadoUtils,
    private readonly emailService: EmailService,
    // private readonly configService: ConfigService
    @Inject(globalConfig.KEY)
    private readonly globalConfiguration: ConfigType<typeof globalConfig>
  ) {}

  async findAll(paginationDto?: PaginationDto): Promise<ResponseRecadoDto[]> {
    // console.log(this.recadosUtils.inverteString('gomide'));
    // console.log(this.configService.get('DATABASE_USERNAME'));
    // console.log(this.recadosConfiguration.teste1);
    const { limit = 10, offset = 0 } = paginationDto;
    const recados = await this.recadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      select: {
        de: { id: true, nome: true },
        para: { id: true, nome: true },
      },
    });
    return recados;
  }

  async findOne(id: number): Promise<ResponseRecadoDto> {
    const recado = await this.recadoRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      select: {
        de: { id: true, nome: true },
        para: { id: true, nome: true },
      },
    });
    if (recado) return recado;
    // throw new HttpException('Recado não encontrado.', HttpStatus.NOT_FOUND)
    throw new NotFoundException('Recado não encontrado.');
  }

  async create(createRecadoDto: CreateRecadoDto, @TokenPayloadParam() tokenPayLoad: TokenPayloadDto): Promise<ResponseRecadoDto> {
    const { paraId } = createRecadoDto;
    const de = await this.pessoasService.findOne(tokenPayLoad.sub);
    const para = await this.pessoasService.findOne(paraId);

    const newRecado = {
      texto: createRecadoDto.texto,
      lido: false,
      data: new Date(),
      de,
      para,
    };
    const recado = this.recadoRepository.create(newRecado);
    await this.recadoRepository.save(recado);
    this.emailService.sendEmail(para.email, `Você recebeu um recado de ${de.nome}`, createRecadoDto.texto);
    return {
      ...recado,
      de: { 
        id: recado.de.id,
        nome: recado.de.nome
      },
      para: { 
        id: recado.para.id,
        nome: recado.para.nome
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto, @TokenPayloadParam() tokenPayLoad: TokenPayloadDto): Promise<ResponseRecadoDto> {
    const recado = await this.findOne(id);
    if (recado.de.id !== tokenPayLoad.sub)
      throw new ForbiddenException('Não possui permissão!');
    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;
    if (recado) return await this.recadoRepository.save(recado);
    throw new NotFoundException('Recado não encontrado.');
  }

  async remove(id: number, @TokenPayloadParam() tokenPayLoad: TokenPayloadDto): Promise<ResponseRecadoDto> {
    const recado = await this.findOne(id);
    if (!recado)
      throw new NotFoundException('Recado não encontrado.');
    if (recado.de.id !== tokenPayLoad.sub)
      throw new ForbiddenException('Não possui permissão!');
    await this.recadoRepository.delete(recado.id);
    return recado;
  }
}
