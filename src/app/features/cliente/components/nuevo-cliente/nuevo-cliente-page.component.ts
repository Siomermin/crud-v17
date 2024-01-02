import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { Cliente } from '../../../../models/cliente.interface';
import { ClientesService } from '../../../../services/clientes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterModule],
  templateUrl: './nuevo-cliente-page.component.html',
  styles: '',
})
export default class NuevoClienteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clientesService = inject(ClientesService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public clientePorEditar = signal<Cliente | undefined>(undefined);
  public cliente = signal<Cliente | undefined>(undefined);

  public get clienteActual(): Cliente {
    return this.form.value as Cliente;
  }

  public form: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    descripcion: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params.subscribe(({ codigo }) => {
      this.clientePorEditar.set(
        this.clientesService.getClientePorCodigo(codigo)
      );

      if (!this.clientePorEditar()) {
        this.router.navigateByUrl('/');
        return;
      }

      this.form.reset(this.clientePorEditar());
    });
  }

  esInputValido(nombreInput: string): boolean | null {
    return (
      this.form.controls[nombreInput].errors &&
      this.form.controls[nombreInput].touched
    );
  }

  mostrarErrorInput(nombreInput: string): string | null {
    if (!this.form.controls[nombreInput]) return null;

    const errores = this.form.controls[nombreInput].errors || {};

    for (const key of Object.keys(errores)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errores['minlength'].requiredLength} caracteres`;

        case 'maxlength':
          return `Máximo ${errores['maxlength'].requiredLength} caracteres`;
      }
    }

    return null;
  }

  eliminarCliente(cliente: Cliente): void {
    Swal.fire({
      title: `Esta seguro de eliminar a ${cliente.nombre}?`,
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`${cliente.nombre} fue eliminado!`, '', 'success');
        this.clientesService.eliminarCliente(cliente);
        this.router.navigate(['/clientes/lista']);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();

      return;
    }

    if (this.clientePorEditar()) {
      const clienteEditado: Cliente = {
        ...this.clientePorEditar(),
        ...this.clienteActual,
      };

      this.clientesService.editarCliente(clienteEditado);
      this.router.navigate(['/clientes/lista']);
      Swal.fire(`${this.clienteActual.nombre} editado!`, '', 'success');
      return;
    }

    this.clientesService.agregarCliente(this.clienteActual);
    this.router.navigate(['/clientes/lista']);
    Swal.fire(`${this.clienteActual.nombre} agregado!`, '', 'success');
  }
}
