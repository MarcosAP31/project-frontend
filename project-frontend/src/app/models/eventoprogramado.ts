import { Tour } from "./tour";
export interface EventoProgramado{
    id:number;
    tour: Tour;
    fecha: string;
    cant_pasajeros: string;
    costo_total:number;
    
}