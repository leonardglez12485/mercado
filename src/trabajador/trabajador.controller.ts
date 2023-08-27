import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrabajadorService } from './trabajador.service';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('trabajador')
@Controller('trabajador')
export class TrabajadorController {
  constructor(private readonly trabajadorService: TrabajadorService) {}

  @Post()
  create(@Body() createTrabajadorDto: CreateTrabajadorDto) {
    return this.trabajadorService.create(createTrabajadorDto);
  }

  @Get()
  findAll() {
    return this.trabajadorService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Busca todos los trabajadores por cualquier termino de busqueda'})
  findOne(@Param('id') id: string) {
    return this.trabajadorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrabajadorDto: UpdateTrabajadorDto) {
    return this.trabajadorService.update(id, updateTrabajadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trabajadorService.remove(id);
  }
}
