import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min, MinLength } from "class-validator";
import { Departamento } from "src/departamento/entities/departamento.entity";



export class CreateTrabajadorDto {

    @IsString()
    nombre: string;

    @IsNumber()
    @Min(6)
    @ApiProperty( {description: 'Recuerde que el CI debe tener 11 digitos'})
    ci: number;

    @IsMongoId()
    @IsOptional()
    @ApiProperty({required: false, type: String, description: 'ID del Departamento al que pertenece'})
    depto?: Departamento;
}
