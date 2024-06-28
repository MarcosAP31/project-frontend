import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  ruta_servidor:string = "http://localhost:8080/api";
  recurso:string ="users";

  constructor(private clienteHTTP:HttpClient) { }
  listaUsuarios(){
    return this.clienteHTTP.get<Usuario[]>(this.ruta_servidor+"/"+this.recurso);
  }

  detalleUsuario(id:number){
    return this.clienteHTTP.get<Usuario>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaUsuario(usuario: Usuario){
    return this.clienteHTTP.put<Usuario>(this.ruta_servidor+"/"+this.recurso+"/"+usuario.id.toString(),usuario);
  }

  registraUsuario(usuario: Usuario){
    return this.clienteHTTP.post<Usuario>(this.ruta_servidor+"/"+this.recurso,usuario);
  }

  eliminaUsuario(id:number){
    return this.clienteHTTP.delete<Usuario>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

}
