import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadoUtils } from './recados.utils';
import { SERVER_NAME } from 'src/common/constants/server-name.constant';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import { RemoveSpaceRegex } from 'src/common/regex/remove-space.regex';
import { OnlyLowercaseLetterRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { ONLY_LOWERCASE_LETTERS_REGEX, REMOVE_SPACES_REGEX } from './recados.constants';
import { RegexFactory } from 'src/common/regex/regex.factory';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';
import { ConfigModule } from '@nestjs/config';
import recadosConfig from './recados.config';
import globalConfig from 'src/global-config/global.config';

@Module({
  imports: [
    // ConfigModule,
    ConfigModule.forFeature(globalConfig),
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
    // MyDynamicModule.register({
    //   apiKey: 'A1BC6BFD7BFEE383FF7C7AB332489579D29ECCABE16772E9911C51AB47EC2898',
    //   apiUrl: 'http://eaprendizapp.com.br'
    // })
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RecadoUtils
    // {
    //   provide: RecadoUtils,
    //   useClass: RecadoUtils,
    //   // useValue: new RecadoUtilsMock()
    // },
    // {
    //   provide: SERVER_NAME,
    //   useValue: 'My Name Is NestJS'
    // },
    // RegexFactory,
    // {
    //   provide: REMOVE_SPACES_REGEX,
    //   useFactory: async (regexFactory: RegexFactory) => {
    //     // Espera algo ocorrer
    //     await new Promise(resolve => setTimeout(resolve, 500));
    //     return regexFactory.create('OnlyLowerCaseLettersRegex');
    //   }, // Pode ser uma função normal
    //   inject: [RegexFactory]
    // }
    // {
    //   provide: RegexProtocol,
    //   useClass: 1 === 1 ? RemoveSpaceRegex : OnlyLowercaseLetterRegex
    // }
    // {
    //   provide: ONLY_LOWERCASE_LETTERS_REGEX,
    //   useClass: OnlyLowercaseLetterRegex
    // },
    // {
    //   provide: REMOVE_SPACES_REGEX,
    //   useClass: RemoveSpaceRegex
    // }
  ],
  exports: [RecadoUtils/*, SERVER_NAME*/]
})
export class RecadosModule {}
