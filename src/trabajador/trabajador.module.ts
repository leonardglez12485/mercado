import { Module } from '@nestjs/common';
import { TrabajadorService } from './trabajador.service';
import { TrabajadorController } from './trabajador.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trabajador, TrabajadorSchema } from './entities/trabajador.entity';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TrabajadorController],
  providers: [TrabajadorService, ConfigService],
  imports:[
    MongooseModule.forFeature([
      {
       name: Trabajador.name,
       schema: TrabajadorSchema,
      }
    ]),
    AuthModule
  ],
  exports:[
    MongooseModule,
  ],
})
export class TrabajadorModule {}
