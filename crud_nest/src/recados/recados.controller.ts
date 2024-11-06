import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { SERVER_NAME } from 'src/common/constants/server-name.constant';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import { RemoveSpaceRegex } from 'src/common/regex/remove-space.regex';
import { REMOVE_SPACES_REGEX } from './recados.constants';
import { MY_DYNAMIC_CONFIG, MyDynamicModule, MyDynamicModuleConfigs } from 'src/my-dynamic/my-dynamic.module';


@Controller('recados')
// @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor, SimpleCacheInterceptor, ChangeDataInterceptor) //Pode ser usado no método
@UsePipes(ParseIntIdPipe)
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    // @Inject(SERVER_NAME)
    // private readonly serverName: string,
    // private readonly regexProtocol: RegexProtocol
    // @Inject(REMOVE_SPACES_REGEX)
    // private readonly removeSpaceRegex: RegexProtocol,
    // @Inject(ONLY_LOWERCASE_LETTERS_REGEX)
    // private readonly onlyLowercaseLettersRegex: RegexProtocol
    // @Inject(REMOVE_SPACES_REGEX)
    // private readonly removeSpacesRegex: RemoveSpaceRegex
    // @Inject(MY_DYNAMIC_CONFIG)
    // private readonly myDynamicConfig: MyDynamicModuleConfigs
  ) {}
  //   @HttpCode(201)
  //   @HttpCode(HttpStatus.CREATED)
  //   @UseInterceptors(TimingConnectionInterceptor)
  //   @UseInterceptors(AuthTokenInterceptor)
  @Get()
  //findAll(@Query() paginationDto: PaginationDto, @UrlParam() url: string) {
  // findAll(@Query() paginationDto: PaginationDto, @ReqDataParam('method') reqData) {
  findAll(@Query() paginationDto: PaginationDto) {
    // console.log(this.removeSpacesRegex.execute('Gomide Batista'));
    // console.log(this.removeSpaceRegex.execute("Gomide Batista"));
    // console.log(this.onlyLowercaseLettersRegex.execute("Gomide Batista"));
    // console.log(req['user']);
    //console.log(url);
    // console.log(reqData);
    //console.log(this.myDynamicConfig.apiKey);
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
