import { Injectable, OnInit, Signal, computed, signal } from '@angular/core';
import { Cliente } from '../models/cliente.interface';

import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  #clientes = signal<Cliente[]>([]);

  public clientes: Signal<Cliente[]> = computed(() => {
    //return this.#clientes().filter((cliente) => cliente.activo);
    return this.#clientes();
  });

  constructor() {
    this.cargarLocalStorage();

    console.log("Se cargo servicio");
  }


  guardarEnLocalStorage(): void {
    localStorage.setItem('clientes', JSON.stringify(this.#clientes()));
  }

  cargarLocalStorage(): void {
    if (!localStorage.getItem('clientes')) return;

    this.#clientes.set(JSON.parse(localStorage.getItem('clientes')!));
  }

  generarCodigo(): string {
    return uuid().slice(0, 10);
  }

  getClientePorCodigo(codigo: string): Cliente | undefined {
    //TODO: Validacion si no viene codigo?
    return this.#clientes().find((cliente) => cliente.codigo === codigo);
  }

  agregarCliente(cliente: Cliente): void {
    const nuevoCliente: Cliente = {
      ...cliente,
      codigo: this.generarCodigo(),
      activo: true,
    };

    this.#clientes().push(nuevoCliente);

    this.guardarEnLocalStorage();
  }

  editarCliente(clientePorEditar: Cliente): void {

    this.#clientes.update(clientes => {

      const indexCliente = clientes.findIndex(
        cliente => cliente.codigo === clientePorEditar.codigo
      );

      clientes[indexCliente] = clientePorEditar;

      return clientes;
    });

    this.guardarEnLocalStorage();
  }

  eliminarCliente(cliente: Cliente): void {
    cliente.activo = false;
    this.editarCliente( cliente );
  }
}
