import { Destino } from "./destino";

export interface Tour{
    id:number;
    destino_id: Destino;
    nombre: string;
    descripcion: string;
    fecha_inicio: Date;
    fecha_final: Date;
    costo: number;
    
}