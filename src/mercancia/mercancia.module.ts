import { Module } from '@nestjs/common';
import { MercanciaService } from './mercancia.service';
import { MercanciaController } from './mercancia.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Mercancia, MercanciaSchema } from './entities/mercancia.entity';
import { DepartamentoModule } from 'src/departamento/departamento.module';


@Module({
  controllers: [MercanciaController],
  providers: [MercanciaService],
  imports:[
    ConfigModule,
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
