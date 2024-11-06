import {
  Module
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { GlobalConfigModule } from './global-config/global-config.module';
import * as Joi from '@hapi/joi';
import appConfig from './app.config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: ['.env'],
    //   ignoreEnvFile: true
    // }),
    // ConfigModule.forRoot({
    //   // load: [appConfig],
    //   // validationSchema: Joi.object({
    //   //   DATABASE_TYPE: Joi.required(),
    //   //   DATABASE_HOST: Joi.required(),
    //   //   DATABASE_PORT: Joi.number().default(5432),
    //   //   DATABASE_USERNAME: Joi.required(),
    //   //   DATABASE_DATABASE: Joi.required(),
    //   //   DATABASE_PASSWORD: Joi.required(),
    //   //   DATABASE_AUTOLOADENTITIES: Joi.number().min(0).max(1).default(0),
    //   //   DATABASE_SYNCHRONIZE: Joi.number().min(0).max(1).default(0)
    //   // })
    // }),
    ConfigModule.forRoot(),
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: async (appConfiguration: ConfigType<typeof appConfig>) => {
        return {
          type: appConfiguration.database.type,
          host: appConfiguration.database.host,
          port: appConfiguration.database.port,
          username: appConfiguration.database.username,
          database: appConfiguration.database.database,
          password: appConfiguration.database.password,
          autoLoadEntities: appConfiguration.database.autoLoadEntities,
          synchronize: appConfiguration.database.synchronize
        }
      }
    }),
    // TypeOrmModule.forRoot({
    //   type: process.env.DATABASE_TYPE as 'postgres',
    //   host: process.env.DATABASE_HOST,
    //   port: +process.env.DATABASE_PORT,
    //   username: process.env.DATABASE_USERNAME,
    //   database: process.env.DATABASE_DATABASE,
    //   password: process.env.DATABASE_PASSWORD,
    //   autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
    //   synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE)
    // }),
    RecadosModule,
    PessoasModule,
    GlobalConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: MyExceptionFilter
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: ErrorExceptionFilter,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: IsAdminGuard,
    // },
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(SimpleMiddleware).forRoutes({
//       path: '*',
//       method: RequestMethod.ALL,
//     });
//   }
// }
