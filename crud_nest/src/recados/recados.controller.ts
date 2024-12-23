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
  SetMetadata,
  UseGuards,
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
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { RoutePolicyGuard } from 'src/auth/guard/route-policy.guard';
import { ROUTE_POLICY_KEY } from 'src/auth/auth.constants';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { RoutePolicies } from 'src/auth/enum/route-policies.enum';
import { AuthAndPolicyGuard } from 'src/auth/guard/auth-and-policy.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('recados')
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
  @ApiOperation({ summary: 'Obter todos os recados com paginação.' })
  @ApiQuery({
    name: 'offset',
    required: false,
    example: 0,
    description: 'Número da página inicial'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Limite de itens por página'
  })
  @ApiResponse({ status: 200, description: 'Recados retornados com sucesso.' })
  //@SetRoutePolicy(RoutePolicies.findAllRecados)
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

  //@UseGuards(AuthTokenGuard, RoutePolicyGuard)
  @UseGuards(AuthAndPolicyGuard)
  @ApiBearerAuth()
  @SetRoutePolicy(RoutePolicies.createRecado)
  @Post()
  create(@Body() body: CreateRecadoDto, @TokenPayloadParam() tokenPayLoad: TokenPayloadDto) {
    return this.recadosService.create(body, tokenPayLoad);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateRecadoDto, @TokenPayloadParam() tokenPayLoad: TokenPayloadDto) {
    return this.recadosService.update(id, body, tokenPayLoad);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @TokenPayloadParam() tokenPayLoad: TokenPayloadDto) {
    return this.recadosService.remove(id, tokenPayLoad);
  }
}
