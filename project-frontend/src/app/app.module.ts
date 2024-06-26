import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ListaComponent } from './components/cliente/lista/lista.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ActividadListaComponent } from './components/actividades/lista/lista.component';
import { ActividadDetalleComponent } from './components/actividades/detalle/detalle.component';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { PieComponent } from './components/pie/pie.component';
import { DetalleComponent } from './components/cliente/detalle/detalle.component';

import { NuevoDestinoComponent } from './components/destino/nuevo-destino/nuevo-destino.component';
import { ListaDestinoComponent } from './components/destino/lista-destino/lista-destino.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    InicioComponent,
    CabeceraComponent,
    PieComponent,
    DetalleComponent,
    NuevoDestinoComponent,
    ListaDestinoComponent,
    ActividadDetalleComponent,
    ActividadListaComponent
   
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }