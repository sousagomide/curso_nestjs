import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  //   @HttpCode(201)
  //   @HttpCode(HttpStatus.CREATED)
  @Get()
  findAll() {
    //findAll(@Query() pagination: any) {
    //const { limit = 10, offset = 0 } = pagination;
    //return `Essa rota retorna todos os recados. Limit=${limit} e Offset=${offset}`;
    return this.recadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateRecadoDto) {
    return this.recadosService.create(body);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRecadoDto) {
    return this.recadosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
