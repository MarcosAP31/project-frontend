import { RestElement } from './../../../../../node_modules/@types/estree/index.d';
import { Component, ViewChild } from '@angular/core';
import { ActividadService } from '../../../services/actividad.service';
import { Actividad } from '../../../models/actividad';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerError } from '../../../models/server-error';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ActividadListaComponent {
  dsLista=new MatTableDataSource<Actividad>();
  listaResultante:any;
  displayedColumns: string[]=["id","description","acciones"];
  @ViewChild("paginator") paginator!: MatPaginator;


  constructor(private actividadService:ActividadService, private _snackBar: MatSnackBar, private dialogos: MatDialog){}

  ngOnInit(){
    this.cargaLista();
    //this.dsLista.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsLista.filter = filterValue.trim().toLowerCase();
  }


  eliminarActividad(actividad:Actividad){
    /*console.log(actividad);
    let id=actividad.id;
    let confirmarEliminacion = this.dialogos.open(ConfirmComponent, {data:{tipo:"Actividad",item:actividad.description}});
    confirmarEliminacion.afterClosed().subscribe(
      result=>{
        if (result) {
          this.actividadService.eliminaActividad(id).subscribe({
            next:()=>{
              this.cargaLista();
            },
            error:(err:HttpErrorResponse)=>{
              if (err.error.status==500) {
                this._snackBar.open("El actividad tiene relaciones vigentes con otras funtes de información","Ok");
              }              
              console.log(err);
            }
          })  
        }
      }
    );*/
  }


  cargaLista(){
      this.actividadService.listaActividades().subscribe({
          next: (data:Actividad[])=>{
              this.dsLista = new MatTableDataSource(data);
              //this.dsLista.paginator = this.paginator;
          },
          error: (err)=>{
            console.log(err);
          }
      })
  }

 



}
