import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventoProgramado } from '../../../models/eventoprogramado';
import { EventoProgramadoService } from '../../../services/eventoprogramado.service';
import { ToursService } from '../../../services/tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmComponent } from '../../confirm/confirm.component';

@Component({
  selector: 'app-empleado-proyecto-lista',
  templateUrl: './empleado-proyecto-lista.component.html',
  styleUrl: './empleado-proyecto-lista.component.css'
})
export class ListaComponent {
  dsLista=new MatTableDataSource<EventoProgramado>();
  listaResultante:any;
  displayedColumns: string[]=["id","tour","fecha","cantidadPasajeros","costoTotal","acciones"];



  constructor(private tourService:ToursService, private _snackBar: MatSnackBar, 
    private dialogos: MatDialog, private eventoProgramadoService: EventoProgramadoService){}

  ngOnInit(){
    this.cargaLista();
    //this.dsLista.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsLista.filter = filterValue.trim().toLowerCase();
  }


  eliminarEventoProgramado(eventoProgramado:EventoProgramado){
    let id=eventoProgramado.id;
    console.log(eventoProgramado);
    let confirmarEliminacion = this.dialogos.open(ConfirmComponent,{data:{tipo:"Asignación de Empleado",item:eventoProgramado.tour.nombre + " - " + eventoProgramado.tour.nombre}});
    confirmarEliminacion.afterClosed().subscribe(
      result=>{
        if (result) {
          this.eventoProgramadoService.eliminaEventoProgramado(id).subscribe({
            next:()=>{
              this.cargaLista();
            },
            error:(err:HttpErrorResponse)=>{
              if (err.error.status==500) {
                this._snackBar.open("La asignación tiene relaciones vigentes con otras funtes de información","Ok");
              }              
              console.log(err);
            }
          })  
        }
      }
    );
  }


  cargaLista(){
      this.eventoProgramadoService.listaEventoProgramados().subscribe({
          next: (data:EventoProgramado[])=>{
              this.dsLista = new MatTableDataSource(data);
              //this.dsLista.paginator = this.paginator;
          },
          error: (err)=>{
            console.log(err);
          }
      })
  }





}
