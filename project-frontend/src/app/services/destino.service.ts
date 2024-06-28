import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Destino } from '../models/destino';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {

  servidor: string="http://localhost:8080/api";
  recurso: string="destinos";

  constructor(private httpCliente: HttpClient) { }
  listDestino(){
    return this.httpCliente.get<Destino[]>( this.servidor + "/"+this.recurso);
  }
  saveDestino(destino:Destino){
    return this.httpCliente.post<Destino[]>( this.servidor + "/"+this.recurso,destino);
  }
}
