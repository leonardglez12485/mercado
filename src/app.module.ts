import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartamentoModule } from './departamento/departamento.module';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { MercanciaModule } from './mercancia/mercancia.module';
import { JoiValidationSchema } from './config/joi.validation';
import { envConfiguration } from './config/app.config';

import { join } from 'path';
import { SeedModule } from './seed/seed.module';
import { env } from 'process';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      validationSchema: JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'nest-mercado',
    }),
    DepartamentoModule,
    TrabajadorModule,
    MercanciaModule,
    SeedModule,
    FilesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
 constructor(){ 

 }
}
