import { PartialType } from '@nestjs/swagger';
import { CreateMercanciaDto } from './create-mercancia.dto';

export class UpdateMercanciaDto extends PartialType(CreateMercanciaDto) {}
