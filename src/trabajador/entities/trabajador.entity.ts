import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { Departamento } from "src/departamento/entities/departamento.entity";

@Schema()
export class Trabajador extends Document {

    @Prop({
        unique: true
       })
    nombre: string;

    @Prop({ 
        unique: true
    })
    ci: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Departamento', required: false})
    depto?: Departamento;

}

export const TrabajadorSchema = SchemaFactory.createForClass(Trabajador);
