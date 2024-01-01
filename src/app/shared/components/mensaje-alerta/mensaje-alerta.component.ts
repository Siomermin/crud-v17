import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-mensaje-alerta',
  standalone: true,
  imports: [],
  templateUrl: './mensaje-alerta.component.html',
  styles: ''
})
export class MensajeAlertaComponent {
  @Input({ required: true }) mensaje!: string;
}
