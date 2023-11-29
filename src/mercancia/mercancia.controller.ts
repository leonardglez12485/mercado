import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MercanciaService } from './mercancia.service';
import { CreateMercanciaDto } from './dto/create-mercancia.dto';
import { UpdateMercanciaDto } from './dto/update-mercancia.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { Trabajador } from 'src/trabajador/entities/trabajador.entity';
import { User } from '../auth/entities/user.entity';

@ApiTags('Mercancia')
@Controller('mercancia')
@Auth()
export class MercanciaController {
  constructor(private readonly mercanciaService: MercanciaService) {}

  @Post()
  @Auth(ValidRoles.worker)
  @ApiResponse({status: 201, description: 'Mercancia creada'})
  create(
    @Body() createMercanciaDto: CreateMercanciaDto,
    @GetUser() user: User
    ) {
     const trab = new Trabajador;
    // console.log(trab);
    return this.mercanciaService.create(createMercanciaDto, trab);
  } 

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.mercanciaService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.mercanciaService.findOne(term);
  }

  @Get('search/:term')
  @Auth()
  @ApiOperation({summary: 'Busca Todas las mercnacias de un departamento'})
  findMErcaByDepto(@Param('term') term: string) {
    return this.mercanciaService.mercaDepto(term);
  }

  @Patch(':term')
  @Auth(ValidRoles.admin, ValidRoles.super_admin)
  update(@Param('term') term: string, @Body() updateMercanciaDto: UpdateMercanciaDto) {
    return this.mercanciaService.update(term, updateMercanciaDto);
  }

  @Delete(':term')
  @Auth(ValidRoles.admin, ValidRoles.super_admin)
  remove(@Param('term') term: string) {
    return this.mercanciaService.remove(term);
  }
}
