import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MercanciaModule } from 'src/mercancia/mercancia.module';
import { TrabajadorModule } from 'src/trabajador/trabajador.module';
import { DepartamentoModule } from 'src/departamento/departamento.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    DepartamentoModule,
    MercanciaModule,
    TrabajadorModule
  ],
  exports:[SeedService]
})
export class SeedModule {}
