import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';
import { error } from 'console';
import { Empleado } from '../../../models/empleado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerError } from '../../../models/server-error';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  idEmpleado:number=0;
  detalleForm!:FormGroup;
  noExiste:boolean=false;

  constructor (private ruta:ActivatedRoute, private empleadoService:EmpleadoService,
                private formBuilder:FormBuilder, private enrutador:Router, 
                private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.cargaEmpleado();
  }

  grabarEmpleado(){
    const empleado:Empleado={
      id: parseInt(this.detalleForm.get("idEmp")!.value),
      name: this.detalleForm.get("nameEmp")!.value,
      city: this.detalleForm.get("cityEmp")!.value,
      salary: parseFloat(this.detalleForm.get("salaryEmp")!.value),
    };

    if (this.idEmpleado!=0) {

      this.empleadoService.actualizaEmpleado(empleado).subscribe({
        next:()=>{
          this._snackBar.open("El empleado se actualizó","Ok",{duration: 1000 });
          this.enrutador.navigate(["/empleado/lista"]);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    } else {
      this.empleadoService.registraEmpleado(empleado).subscribe({
        next:()=>{
          this._snackBar.open("El empleado se registró","Ok",{duration: 1000 });
          this.enrutador.navigate(["/empleado/lista"]);
        },
        error:(err)=>{          
          this._snackBar.open("No se registró al empleado: "+err.error.message,"Ok",{duration: 2000 });          
        }
      });
    }
  }

  cargaEmpleado() {

    this.detalleForm = this.formBuilder.group({
      idEmp:[""],
      nameEmp:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      cityEmp:["",[Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      salaryEmp:["",[Validators.required, Validators.min(0.1)]]
    });


    this.idEmpleado = this.ruta.snapshot.params["codigo"];
   
    if(this.idEmpleado!=0 && this.idEmpleado!=undefined) {
      this.empleadoService.detalleEmpleado(this.idEmpleado).subscribe({
        next: (data:Empleado)=> {
          
          this.detalleForm.get("idEmp")?.setValue(data.id);
          this.detalleForm.get("nameEmp")?.setValue(data.name);
          this.detalleForm.get("cityEmp")?.setValue(data.city);
          this.detalleForm.get("salaryEmp")?.setValue(data.salary);
          
        },
        error: (err:ServerError)=> {
          if (err.status==404) {
            this.noExiste=true;
          }
          console.log(err);
        }
      });
    } else {
      this.idEmpleado=0;
      this.detalleForm.get("idEmp")?.setValue(this.idEmpleado);
    }


  }


}
