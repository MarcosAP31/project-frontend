import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './components/cliente/lista/lista.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaTourComponent } from './components/tour/lista-tour/lista-tour.component';
import { NuevoTourComponent } from './components/tour/nuevo-tour/nuevo-tour.component';
import { NuevoDestinoComponent } from './components/destino/nuevo-destino/nuevo-destino.component';
import { ListaDestinoComponent } from './components/destino/lista-destino/lista-destino.component';

const routes: Routes = [
  { path:"", component:InicioComponent},
  { path:"inicio", component:InicioComponent},
  { path:"listaCliente", component:ListaComponent},
  { path:"listaTour", component:ListaTourComponent},
  { path:"nuevoTour", component:NuevoTourComponent},
  { path:"nuevodestino", component:NuevoDestinoComponent},
  { path:"listaDestino", component:ListaDestinoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
