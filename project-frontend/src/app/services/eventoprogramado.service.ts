import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventoProgramado } from '../models/eventoprogramado';

@Injectable({
  providedIn: 'root'
})
export class EventoProgramadoService {

  ruta_servidor:string = "http://localhost:8080/api";
  recurso:string ="evento";

  constructor(private clienteHTTP:HttpClient) { }

  listaEventoProgramados(){
    return this.clienteHTTP.get<EventoProgramado[]>(this.ruta_servidor+"/"+this.recurso);
  }

  detalleEventoProgramado(id:number){
    return this.clienteHTTP.get<EventoProgramado>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaEventoProgramado(eventoProgramado: EventoProgramado){
    return this.clienteHTTP.put<EventoProgramado>(this.ruta_servidor+"/"+this.recurso+"/"+eventoProgramado.id.toString(),eventoProgramado);
  }

  registraEventoProgramado(eventoProgramado: EventoProgramado){
    return this.clienteHTTP.post<EventoProgramado>(this.ruta_servidor+"/"+this.recurso,eventoProgramado);
  }

  eliminaEventoProgramado(id:number){
    return this.clienteHTTP.delete<EventoProgramado>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

}
