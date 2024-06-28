import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoProgramadoService } from '../../../services/eventoprogramado.service';
import { error } from 'console';
import { EventoProgramado } from '../../../models/eventoprogramado';
import { Tour } from '../../../models/tour';
import { Destino } from '../../../models/destino';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerError } from '../../../models/server-error';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from '../../../services/tour.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  idEventoProgramado:number=0;
  detalleForm!:FormGroup;
  noExiste:boolean=false;
  listaTours:Tour[]=[];


  constructor (private ruta:ActivatedRoute, private eventoProgramadoService:EventoProgramadoService,
                private tourService:ToursService,
                private formBuilder:FormBuilder, private enrutador:Router, 
                private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.cargaEventoProgramado();
    this.cargaTours();
  }

  cargaTours(){
    this.tourService.listTour().subscribe({
      next:(data:Tour[])=>{
        this.listaTours=data;
      }
    })
  }
  grabarEventoProgramado(){
  
    const eventoProgramado:EventoProgramado={
      
      id: parseInt(this.detalleForm.get("idEve")!.value),
      tour: {id:this.detalleForm.get("tour")!.value, destino: {
        id: 1, 
        nombre: "Nombre del destino",
        descripcion: "Descripción del destino" 
      },nombre:"", descripcion:"", fecha_inicio:new Date(), fecha_final:new Date(), costo:0},
      fecha: this.detalleForm.get("nameEmp")!.value,
      cant_pasajeros: this.detalleForm.get("cityEmp")!.value,
      costo_total: parseFloat(this.detalleForm.get("salaryEmp")!.value),
    };

    if (this.idEventoProgramado!=0) {

      this.eventoProgramadoService.actualizaEventoProgramado(eventoProgramado).subscribe({
        next:()=>{
          this._snackBar.open("El eventoProgramado se actualizó","Ok",{duration: 1000 });
          this.enrutador.navigate(["/eventoProgramado/lista"]);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    } else {
      this.eventoProgramadoService.registraEventoProgramado(eventoProgramado).subscribe({
        next:()=>{
          this._snackBar.open("El eventoProgramado se registró","Ok",{duration: 1000 });
          this.enrutador.navigate(["/eventoProgramado/lista"]);
        },
        error:(err)=>{          
          this._snackBar.open("No se registró al eventoProgramado: "+err.error.message,"Ok",{duration: 2000 });          
        }
      });
    }
  }

  cargaEventoProgramado() {

    this.detalleForm = this.formBuilder.group({
      idEve:[""],
      tour:[""],
      fechaEve:[""],
      cantPasajerosEve:[""],
      costoEve:[""]
    });


    this.idEventoProgramado = this.ruta.snapshot.params["codigo"];
   
    if(this.idEventoProgramado!=0 && this.idEventoProgramado!=undefined) {
      this.eventoProgramadoService.detalleEventoProgramado(this.idEventoProgramado).subscribe({
        next: (data:EventoProgramado)=> {
          
          this.detalleForm.get("idEve")?.setValue(data.id);
          this.detalleForm.get("tour")?.setValue(data.tour.id);
          this.detalleForm.get("fechaEve")?.setValue(data.fecha);
          this.detalleForm.get("cantPasajerosEve")?.setValue(data.cant_pasajeros);
          this.detalleForm.get("costoEve")?.setValue(data.costo_total);
          
        },
        error: (err:ServerError)=> {
          if (err.status==404) {
            this.noExiste=true;
          }
          console.log(err);
        }
      });
    } else {
      this.idEventoProgramado=0;
      this.detalleForm.get("idEmp")?.setValue(this.idEventoProgramado);
    }


  }


}
