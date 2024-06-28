import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../../models/cliente';
import { ServerError } from '../../../models/server-error';
import { error } from 'console';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class ClienteDetalleComponent {
  idCliente: number = 0;
  detalleForm!: FormGroup;
  noExiste: boolean = false;
  fotoCliente: any = null;

  constructor(
    private ruta: ActivatedRoute,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private enrutador: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  seleccionarFoto(event: any) {
    this.fotoCliente = event.target.files[0];
    console.log(this.fotoCliente);
  }

  guardarCliente() {
    const cliente: Cliente = {
      id: parseInt(this.detalleForm.get("idCli")!.value),
      nombre: this.detalleForm.get("nombreCli")!.value,
      photo: null // Aquí se asignaría la foto si fuera necesario
    };

    if (this.idCliente != 0) {
      this.clienteService.actualizaCliente(cliente).subscribe({
        next: (data: Cliente) => {
          if (this.fotoCliente) {
            const fotoFormData = new FormData();
            fotoFormData.append("photo", this.fotoCliente, this.fotoCliente.name);

            this.clienteService.actualizaFoto(data.id, fotoFormData).subscribe({
              next: () => {
                this._snackBar.open("Se actualizó la foto del cliente", "Ok", { duration: 1000 });
                this.enrutador.navigate(["/cliente/lista"]);
              },
              error: (err) => {
                this._snackBar.open("No se pudo actualizar la foto: " + err.error.message, "Ok", { duration: 2000 });
                console.error(err);
              }
            });
          }

          this._snackBar.open("El cliente se actualizó", "Ok", { duration: 1000 });
          this.enrutador.navigate(["/cliente/lista"]);
        },
        error: (err) => {
          console.error(err);
          this._snackBar.open("No se pudo actualizar al cliente: " + err.error.message, "Ok", { duration: 2000 });
        }
      });
    } else {
      this.clienteService.registraCliente(cliente).subscribe({
        next: (data: Cliente) => {
          if (this.fotoCliente) {
            const fotoFormData = new FormData();
            fotoFormData.append("photo", this.fotoCliente, this.fotoCliente.name);

            this.clienteService.actualizaFoto(data.id, fotoFormData).subscribe({
              next: () => {
                this._snackBar.open("Se agregó la foto del cliente", "Ok", { duration: 1000 });
                this.enrutador.navigate(["/cliente/lista"]);
              },
              error: (err) => {
                this._snackBar.open("No se pudo agregar la foto: " + err.error.message, "Ok", { duration: 2000 });
                console.error(err);
              }
            });
          }

          this._snackBar.open("El cliente se registró", "Ok", { duration: 1000 });
          this.enrutador.navigate(["/cliente/lista"]);
        },
        error: (err) => {
          console.error(err);
          this._snackBar.open("No se pudo registrar al cliente: " + err.error.message, "Ok", { duration: 2000 });
        }
      });
    }
  }

  cargarCliente() {
    this.detalleForm = this.formBuilder.group({
      idCli: [""],
      nombreCli: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      // Agrega más campos según la estructura de tu formulario
    });

    this.idCliente = this.ruta.snapshot.params["codigo"];

    if (this.idCliente != 0 && this.idCliente != undefined) {
      this.clienteService.detalleCliente(this.idCliente).subscribe({
        next: (data: Cliente) => {
          this.detalleForm.get("idCli")?.setValue(data.id);
          this.detalleForm.get("nombreCli")?.setValue(data.nombre);
          // Setea más campos según la estructura de tu formulario
        },
        error: (err: ServerError) => {
          if (err.status == 404) {
            this.noExiste = true;
          }
          console.error(err);
        }
      });
    } else {
      this.idCliente = 0;
      this.detalleForm.get("idCli")?.setValue(this.idCliente);
    }
  }
}
