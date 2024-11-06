import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import { Request } from 'express';
import { UrlParam } from 'src/common/params/url-param.decorator';
import { ReqDataParam } from 'src/common/params/req-data.decorator';

@Controller('recados')
// @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor, SimpleCacheInterceptor, ChangeDataInterceptor) //Pode ser usado no método
@UsePipes(ParseIntIdPipe)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  //   @HttpCode(201)
  //   @HttpCode(HttpStatus.CREATED)
  //   @UseInterceptors(TimingConnectionInterceptor)
  //   @UseInterceptors(AuthTokenInterceptor)
  @Get()
  //findAll(@Query() paginationDto: PaginationDto, @UrlParam() url: string) {
  findAll(@Query() paginationDto: PaginationDto, @ReqDataParam('method') reqData) {
    // console.log(req['user']);
    //console.log(url);
    console.log(reqData);
    return this.recadosService.findAll(paginationDto);
  }

  // @UseInterceptors(AuthTokenInterceptor)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateRecadoDto) {
    return this.recadosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateRecadoDto) {
    return this.recadosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
