import { Controller, Module } from '@nestjs/common';
import { MercanciaService } from './mercancia.service';
import { MercanciaController } from './mercancia.controller';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Departamento, DepartamentoSchema } from 'src/departamento/entities/departamento.entity';
import { Mercancia, MercanciaSchema } from './entities/mercancia.entity';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { DepartamentoService } from '../departamento/departamento.service';
import { Model } from 'mongoose';

@Module({
  controllers: [MercanciaController],
  providers: [MercanciaService, ConfigService],
  imports:[
    MongooseModule.forFeature([
      {
       name: Mercancia.name,
       schema: MercanciaSchema,
      },

    ]),
    DepartamentoModule
    
  ],
  exports:[
    MongooseModule,
  ],
})
export class MercanciaModule {}
