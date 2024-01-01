import { Component, computed, inject } from '@angular/core';
import { Cliente } from '../../../../models/cliente.interface';
import { RouterModule } from '@angular/router';
import { ClientesService } from '../../../../services/clientes.service';
import { TitleCasePipe } from '@angular/common';
import { MensajeAlertaComponent } from '../../../../shared/components/mensaje-alerta/mensaje-alerta.component';

@Component({
  selector: 'cliente-tabla',
  standalone: true,
  imports: [RouterModule, TitleCasePipe, MensajeAlertaComponent],
  templateUrl: './tabla-cliente.component.html',
  styles: ``
})
export default class TablaComponent {
  private clientesService = inject(ClientesService);

  public clientes = computed<Cliente[] | undefined>(() => {
    return this.clientesService.clientes().filter( cliente => cliente.activo);
  });

  ngOnInit(): void {
    // this.cargarClientes();
    console.log('se cargo componente');
  }

}
