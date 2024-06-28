import { RestElement } from './../../../../../node_modules/@types/estree/index.d';
import { Component, ViewChild } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerError } from '../../../models/server-error';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../confirm/confirm.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ClienteListaComponent {
  dsLista=new MatTableDataSource<Cliente>();
  listaResultante:any;
  displayedColumns: string[]=["id","nombres","telefono","correo","usuario","photo","acciones"];
  @ViewChild("paginator") paginator!: MatPaginator;


  constructor(private clienteService:ClienteService, private _snackBar: MatSnackBar, private dialogos: MatDialog){}

  ngOnInit(){
    this.cargaLista();
    //this.dsLista.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsLista.filter = filterValue.trim().toLowerCase();
  }


  eliminarCliente(cliente:Cliente){
    console.log(cliente);
    let id=cliente.id;
    let confirmarEliminacion = this.dialogos.open(ConfirmComponent, {data:{tipo:"Cliente",item:cliente.nombres}});
    confirmarEliminacion.afterClosed().subscribe(
      result=>{
        if (result) {
          this.clienteService.eliminaCliente(id).subscribe({
            next:()=>{
              this.cargaLista();
            },
            error:(err:HttpErrorResponse)=>{
              if (err.error.status==500) {
                this._snackBar.open("El cliente tiene relaciones vigentes con otras funtes de información","Ok");
              }              
              console.log(err);
            }
          })  
        }
      }
    );
  }


  cargaLista(){
      this.clienteService.listaClientes().subscribe({
          next: (data:Cliente[])=>{
              this.dsLista = new MatTableDataSource(data);
              
              data.forEach((cli: Cliente) => {
                cli.photo = "data:image/jpeg;base64, " + cli.photo;
              })

              
          },
          error: (err)=>{
            console.log(err);
          }
      })
  }

 



}
