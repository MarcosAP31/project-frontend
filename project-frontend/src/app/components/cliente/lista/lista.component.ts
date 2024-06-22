import { Component } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Clientes } from '../../../models/clientes';
import { error } from 'console';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  codigo:number=555;
listaResultante:any;

constructor(private clienteService:ClienteService){}
ngOnInit(){
  this.cargaLista();
}

cargaLista(){
this.clienteService.listaClientes().subscribe({
  next:(data:Clientes[])=>{
    

  },
  error:(err)=>{
    console.log(err);
  }
})
}
}
