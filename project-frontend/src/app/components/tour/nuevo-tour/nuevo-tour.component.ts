import { Component } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ToursService } from '../../../services/tour.service';
import { Router } from 'express';
import { Tour } from '../../../models/tour';

@Component({
  selector: 'app-nuevo-tour',
  templateUrl: './nuevo-tour.component.html',
  styleUrl: './nuevo-tour.component.css'
})
export class NuevoTourComponent {
  newForm!: FormGroup;

  constructor (private service: ToursService, private router:Router, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.crearFormGroup();
  }

  crearFormGroup(){
    this.newForm=this.formBuilder.group({
      id:[""],
      destino_id:[""],
      nombre:[""],
      descripcion:[""],
      fecha_inicio:[""],
      fecha_final:[""],
      costo:[""]
    });
    this.newForm.get("id")!.setValue(0);
  }

  saveTour(){
    const tour:Tour={
      id: this.newForm.get("id")!.value,
      destino_id: this.newForm.get("destino_id")!.value,
      nombre: this.newForm.get("nombre")!.value,
      descripcion: this.newForm.get("descripcion")!.value,
      fecha_inicio: this.newForm.get("fecha_inicio")!.value,
      fecha_final: this.newForm.get("fecha_final")!.value,
      costo: parseFloat(this.newForm.get("costo")!.value),
    };

    this.service.saveTour(tour).subscribe({
      next:(data:Tour)=>{
        this.router.navigate(["/listaTour"]);
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}

