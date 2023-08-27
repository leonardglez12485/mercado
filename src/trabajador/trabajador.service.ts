import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trabajador } from './entities/trabajador.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TrabajadorService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Trabajador.name)  
    private readonly trabModel: Model<Trabajador>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.getOrThrow<number>('default_limits')
  }

  //=========================
  //Crear un nuevo trabajador
  //=========================
  async create(createTrabajadorDto: CreateTrabajadorDto) {
    createTrabajadorDto.nombre = createTrabajadorDto.nombre.toLocaleLowerCase();
    try {
      const trab = await this.trabModel.create(createTrabajadorDto);
      return trab;
    } catch (error) {
      this.hadleException(error);
    }
  }

  //===================
  //Buscar Trabajdaores
  //===================
  findAll() {
    return this.trabModel.find();
  }

  //====================
  //Buscar un trabajador
  //====================

  async findOne(term: string) {
    let trab: Trabajador;
    //busqueda por ID
    if (!trab && isValidObjectId(term)) {
      trab = await this.trabModel.findById(term);
    }
    //busqueda por nombre
    if (!trab) {
      trab = await this.trabModel.findOne({ nombre: term.toLocaleLowerCase().trim() });
    }
    //busqueda por CI
    if (!trab) {
      trab = await this.trabModel.findOne({ ci: +term });
    }
    if (!trab) {
      throw new NotFoundException(`La mercancia ${term} no existe`);
    }

    return trab;
  }

  //=======================
  //Actualiza un trabajador
  //=======================
  async update(term: string, updateTrabajadorDto: UpdateTrabajadorDto) {
    const trab = await this.findOne(term);
    try {
      await trab.updateOne(updateTrabajadorDto);
      return { ...trab.toJSON(), ...updateTrabajadorDto };
    } catch (error) {
      this.hadleException(error)
    }
  }

  //=======================
  //Elimina un trabajador
  //=======================

  async remove(term: string) {
    const {deletedCount} = await this.trabModel.deleteOne({_id:term});
    if(deletedCount ===0){
      throw new BadRequestException(`Trabajador whit ID: ${term} not Found !!!!`);
    }
  }

  //======================
  //Manejando Los Errores
  //======================
  private hadleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Mercancia exists in DB ${JSON.stringify(error.keyValue)}`);
    }
    console.log({ error });
    throw new InternalServerErrorException(`Can't create Trabajador - Check server logs `);

  }
}
