import { Component } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ClienteListaComponent {

  fotoEmpleado:any=null;
  codigo: number = 555;
  listaResultante: any;
  detalleForm!:FormGroup;
  constructor(private clienteService: ClienteService) { }
  ngOnInit() {
    this.cargaLista();
  }

  cargaLista() {
    this.clienteService.listaClientes().subscribe({
      next: (data: Cliente[]) => {


      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  guardarCliente(){

  }
  seleccionaFoto(event:any){
    this.fotoEmpleado = event.target.files[0];
    console.log(this.fotoEmpleado);
  }
}
