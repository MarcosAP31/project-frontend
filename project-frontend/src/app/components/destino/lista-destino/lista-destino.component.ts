import { Component } from '@angular/core';
import { Destino } from '../../../models/destino';
import { DestinoService } from '../../../services/destino.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrl: './lista-destino.component.css'
})
export class ListaDestinoComponent {
  dsDestinos= new MatTableDataSource<Destino>();
  cantidad:number=0;
  displayedColumns:string[]=["id","nombre","descripcion"];

  constructor (private service: DestinoService){}

  ngOnInit(){
    this.listDestino();
  }

  listDestino(){
    this.service.listDestino().subscribe({
      next: (data:Destino[])=>{
        this.dsDestinos=new MatTableDataSource(data);
        this.cantidad= data.length;
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

}