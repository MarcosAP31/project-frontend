import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToursService } from '../../../services/tour.service';
import { Tour } from '../../../models/tour';

@Component({
  selector: 'app-lista-tour',
  templateUrl: './lista-tour.component.html',
  styles: ``
})
export class ListaTourComponent {
  dsTours= new MatTableDataSource<Tour>();
  cantidad:number=0;
  displayedColumns:string[]=["id","destino_id","nombre","descripcion","fecha_inicio","fecha_final"];

  constructor (private service: ToursService){}

  ngOnInit(){
    this.listTour();
  }

  listTour(){
    this.service.listTour().subscribe({
      next: (data:Tour[])=>{
        this.dsTours=new MatTableDataSource(data);
        this.cantidad= data.length;
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
}