import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListaComponent } from './components/cliente/lista/lista.component';
import { ClienteDetalleComponent } from './components/cliente/detalle/detalle.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ActividadListaComponent } from './components/actividades/lista/lista.component';
import { ActividadDetalleComponent } from './components/actividades/detalle/detalle.component';
import { NuevoDestinoComponent } from './components/destino/nuevo-destino/nuevo-destino.component';
import { ListaDestinoComponent } from './components/destino/lista-destino/lista-destino.component';

const routes: Routes = [
  { path:"", component:InicioComponent},
  { path:"inicio", component:InicioComponent},
  { path:"listaCliente", component:ClienteListaComponent},
  { path:"actividad/detalle/:codigo", component:ActividadDetalleComponent},
  { path:"actividad/agregar", component:ActividadDetalleComponent},
  { path:"actividad/lista", component:ActividadListaComponent},
  { path:"nuevodestino", component:NuevoDestinoComponent},
  { path:"listaDestino", component:ListaDestinoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
