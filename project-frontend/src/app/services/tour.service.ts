import { HttpClient } from '@angular/common/http';
import { Tour } from '../models/tour';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  servidor: string="http://localhost:8080/api";
  recurso: string="tour";

  constructor(private httpCliente: HttpClient) { }
  listTour(){
    return this.httpCliente.get<Tour[]>( this.servidor + "/"+this.recurso);
  }
  saveTour(tour:Tour){
    return this.httpCliente.post<Tour[]>( this.servidor + "/"+this.recurso,tour);
  }

}
