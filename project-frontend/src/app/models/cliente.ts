import { Usuario } from "./usuario";
export interface Cliente{
    id:number;
    nombres: string;
    telefono: string;
    correo: string;
    user:Usuario;
    photo:any;
}