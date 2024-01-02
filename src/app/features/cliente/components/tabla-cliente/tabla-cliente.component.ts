import { Component, computed, inject } from '@angular/core';
import { Cliente } from '../../../../models/cliente.interface';
import { RouterModule } from '@angular/router';
import { ClientesService } from '../../../../services/clientes.service';
import { TitleCasePipe } from '@angular/common';
import { MensajeAlertaComponent } from '../../../../shared/components/mensaje-alerta/mensaje-alerta.component';
import { EstadoClienteDirective } from '../../directives/estado-cliente.directive';

@Component({
  selector: 'cliente-tabla',
  standalone: true,
  imports: [RouterModule, TitleCasePipe, MensajeAlertaComponent, EstadoClienteDirective],
  templateUrl: './tabla-cliente.component.html',
  styles: ``
})
export default class TablaComponent {
  private clientesService = inject(ClientesService);

  public clientes = computed<Cliente[] | undefined>(() => {
    return this.clientesService.clientes().sort((a, b) => (a.activo === b.activo) ? 0 : a.activo ? -1 : 1);
  });

  ngOnInit(): void {
    // this.cargarClientes();
    console.log('se cargo componente');
  }

}
