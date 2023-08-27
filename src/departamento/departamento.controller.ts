import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('departamento')
@Controller('departamento')
export class DepartamentoController {
  constructor(
    private readonly departamentoService: DepartamentoService
    ) {}

  @Post()
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentoService.create(createDepartamentoDto);
  }

  @Get()
  @ApiOperation({summary: 'La lista de departamentos del mercado'})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.departamentoService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.departamentoService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentoService.update(term, updateDepartamentoDto);
  }

  @Delete(':term')
  remove(@Param ('term') term: string) {
  return this.departamentoService.remove(term);
  }
}
