import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoProyecto } from '../../../models/employee-project';
import { EmpleadoProyectoService } from '../../../services/empleado-proyecto.service';
import { EmpleadoService } from '../../../services/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmComponent } from '../../confirm/confirm.component';

@Component({
  selector: 'app-empleado-proyecto-lista',
  templateUrl: './empleado-proyecto-lista.component.html',
  styleUrl: './empleado-proyecto-lista.component.css'
})
export class EmpleadoProyectoListaComponent {
  dsLista=new MatTableDataSource<EmpleadoProyecto>();
  listaResultante:any;
  displayedColumns: string[]=["id","project","employee","hoursWorked","homeOffice","acciones"];



  constructor(private empleadoService:EmpleadoService, private _snackBar: MatSnackBar, 
    private dialogos: MatDialog, private empleadoProyectoService: EmpleadoProyectoService){}

  ngOnInit(){
    this.cargaLista();
    //this.dsLista.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsLista.filter = filterValue.trim().toLowerCase();
  }


  eliminarEmpleadoProyecto(empleadoProyecto:EmpleadoProyecto){
    let id=empleadoProyecto.id;
    console.log(empleadoProyecto);
    let confirmarEliminacion = this.dialogos.open(ConfirmComponent,{data:{tipo:"Asignación de Empleado",item:empleadoProyecto.project.name + " - " + empleadoProyecto.employee.name}});
    confirmarEliminacion.afterClosed().subscribe(
      result=>{
        if (result) {
          this.empleadoProyectoService.eliminaEmpleadoProyecto(id).subscribe({
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
      this.empleadoProyectoService.listaEmpleadoProyecto().subscribe({
          next: (data:EmpleadoProyecto[])=>{
              this.dsLista = new MatTableDataSource(data);
              //this.dsLista.paginator = this.paginator;
          },
          error: (err)=>{
            console.log(err);
          }
      })
  }





}
