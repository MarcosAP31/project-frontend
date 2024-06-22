import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clientes } from '../models/clientes';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlBase ='http://localhost:8080/api/';

  constructor(private clienteHTTP:HttpClient) { }
  listaClientes(){
    return this.clienteHTTP.get<Clientes[]>( this.urlBase + "clientes");
  }
}
