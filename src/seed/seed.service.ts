import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartamentoDto } from 'src/departamento/dto/create-departamento.dto';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { CreateMercanciaDto } from 'src/mercancia/dto/create-mercancia.dto';
import { Mercancia } from 'src/mercancia/entities/mercancia.entity';
import { CreateTrabajadorDto } from 'src/trabajador/dto/create-trabajador.dto';
import { Trabajador } from 'src/trabajador/entities/trabajador.entity';

@Injectable()
export class SeedService {

 constructor(
  @InjectModel(Mercancia.name) private readonly mercaModel: Model<Mercancia>,
  @InjectModel(Departamento.name) private readonly deptoModel: Model<Departamento>,
  @InjectModel(Trabajador.name) private readonly trabModel: Model<Trabajador>,

 ){} 


   //Seed 
   async excecuteSeed(){
    const trab= await this.trabModel.find().countDocuments();
    const dpto= await this.deptoModel.find().countDocuments();
    const merca= await this.mercaModel.find().countDocuments();
    
    if(dpto===0){
      this.excecuteDepartamento();
    }
   }
//    async excecuteMercancia(): Promise<Mercancia> {
//     try {
//        let merca: CreateMercanciaDto = {
//         nombre: 'Refresco',
//         depto: null,
//         disponible: true,
//         cantidad: 500,
//         precio: 25.00,
//         fechaEntrada: new Date().toDateString()
//       }
//       return await this.mercaModel.create(merca);
//     } catch (error) {
//       throw error;
//     }
//  }

    //Seed Departamento
    async excecuteDepartamento(): Promise<Departamento> {
        try {
           let depto: CreateDepartamentoDto = {
            nombre: 'Bebidas Frias',
            cant_trab: 10,
            cant_producto: 0,
            is_empty: false 
          }
          return await this.deptoModel.create(depto);
        } catch (error) {
          throw error;
        }
        
     }

     //Seed trabajador
    // async excecuteTrabajador(): Promise<Trabajador> {
    //     try {
    //        let trab: CreateTrabajadorDto = {
    //         nombre: 'Leonard Gonzalez',
    //         ci: 85041219382,
    //         depto: null
    //       }
    //       return await this.trabModel.create(trab);
    //     } catch (error) {
    //       throw error;
    //     }
    //  }
}
