import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MercanciaService } from './mercancia.service';
import { CreateMercanciaDto } from './dto/create-mercancia.dto';
import { UpdateMercanciaDto } from './dto/update-mercancia.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('mercancia')
@Controller('mercancia')
export class MercanciaController {
  constructor(private readonly mercanciaService: MercanciaService) {}

  @Post()
  create(@Body() createMercanciaDto: CreateMercanciaDto) {
    return this.mercanciaService.create(createMercanciaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.mercanciaService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.mercanciaService.findOne(term);
  }

  @Get('search/:term')
  @ApiOperation({summary: 'Busca Todas las mercnacias de un departamento'})
  findMErcaByDepto(@Param('term') term: string) {
    return this.mercanciaService.mercaDepto(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateMercanciaDto: UpdateMercanciaDto) {
    return this.mercanciaService.update(term, updateMercanciaDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.mercanciaService.remove(term);
  }
}
