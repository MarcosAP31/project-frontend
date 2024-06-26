import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  ruta_servidor:string = "http://localhost:8080/api";
  recurso:string ="actividades";

  constructor(private clienteHTTP:HttpClient) { }

  listaActividades(){
    return this.clienteHTTP.get<Actividad[]>(this.ruta_servidor+"/"+this.recurso);
  }

  detalleActividad(id:number){
    return this.clienteHTTP.get<Actividad>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaActividad(actividad: Actividad){
    return this.clienteHTTP.put<Actividad>(this.ruta_servidor+"/"+this.recurso+"/"+actividad.id.toString(),actividad);
  }

  registraActividad(actividad: Actividad){
    return this.clienteHTTP.post<Actividad>(this.ruta_servidor+"/"+this.recurso,actividad);
  }

  eliminaActividad(id:number){
    return this.clienteHTTP.delete<Actividad>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

}
