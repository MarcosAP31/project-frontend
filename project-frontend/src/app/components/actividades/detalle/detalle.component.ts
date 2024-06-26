import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadService } from '../../../services/actividad.service';
import { error } from 'console';
import { Actividad } from '../../../models/actividad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerError } from '../../../models/server-error';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class ActividadDetalleComponent {
  idActividad:number=0;
  detalleForm!:FormGroup;
  noExiste:boolean=false;

  constructor (private ruta:ActivatedRoute, private actividadService:ActividadService,
                private formBuilder:FormBuilder, private enrutador:Router, 
                private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.cargaActividad();
  }

  grabarActividad(){
    const actividad:Actividad={
      id: parseInt(this.detalleForm.get("idAct")!.value),
      description: this.detalleForm.get("descriptionAct")!.value,
    };

    if (this.idActividad!=0) {

      this.actividadService.actualizaActividad(actividad).subscribe({
        next:()=>{
          this._snackBar.open("La actividad se actualizó","Ok",{duration: 1000 });
          this.enrutador.navigate(["/actividad/lista"]);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    } else {
      this.actividadService.registraActividad(actividad).subscribe({
        next:()=>{
          this._snackBar.open("La actividad se registró","Ok",{duration: 1000 });
          this.enrutador.navigate(["/actividad/lista"]);
        },
        error:(err)=>{          
          this._snackBar.open("No se registró la actividad: "+err.error.message,"Ok",{duration: 2000 });          
        }
      });
    }
  }

  cargaActividad() {

    this.detalleForm = this.formBuilder.group({
      idAct:[""],
      descriptionAct:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
    });


    this.idActividad = this.ruta.snapshot.params["codigo"];
   
    if(this.idActividad!=0 && this.idActividad!=undefined) {
      this.actividadService.detalleActividad(this.idActividad).subscribe({
        next: (data:Actividad)=> {
          
          this.detalleForm.get("idAct")?.setValue(data.id);
          this.detalleForm.get("descriptionAct")?.setValue(data.description);

          
        },
        error: (err:ServerError)=> {
          if (err.status==404) {
            this.noExiste=true;
          }
          console.log(err);
        }
      });
    } else {
      this.idActividad=0;
      this.detalleForm.get("idAct")?.setValue(this.idActividad);
    }


  }


}
