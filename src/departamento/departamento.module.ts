import { Module } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';
import { Departamento, DepartamentoSchema } from './entities/departamento.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [DepartamentoController],
  providers: [DepartamentoService, ConfigService],
  imports:[
    MongooseModule.forFeature([
      {
       name: Departamento.name,
       schema: DepartamentoSchema,
      }
    ]),
  ],
  exports:[
    DepartamentoModule,
    MongooseModule,
  ],
})
export class DepartamentoModule {
  
}
