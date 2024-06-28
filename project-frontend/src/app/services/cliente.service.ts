import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  ruta_servidor:string = "http://localhost:8080/api";
  recurso:string ="clientes";

  constructor(private clienteHTTP:HttpClient) { }
  listaClientes(){
    return this.clienteHTTP.get<Cliente[]>(this.ruta_servidor+"/"+this.recurso);
  }

  detalleCliente(id:number){
    return this.clienteHTTP.get<Cliente>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaCliente(eventoProgramado: Cliente){
    return this.clienteHTTP.put<Cliente>(this.ruta_servidor+"/"+this.recurso+"/"+eventoProgramado.id.toString(),eventoProgramado);
  }

  registraCliente(eventoProgramado: Cliente){
    return this.clienteHTTP.post<Cliente>(this.ruta_servidor+"/"+this.recurso,eventoProgramado);
  }

  eliminaCliente(id:number){
    return this.clienteHTTP.delete<Cliente>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaFoto(id:number, foto: FormData){
    return this.clienteHTTP.put<Cliente>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString()+"/"+"photo",foto);
  }
}
