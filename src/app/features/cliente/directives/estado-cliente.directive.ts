import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[estadoCliente]',
})
export class EstadoClienteDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set estado(activo: boolean) {
    this.cambiarColorEstado(activo);
  }

  private cambiarColorEstado(activo: boolean) {
    if (activo) {
      this.renderer.addClass(this.el.nativeElement, 'bg-green-50');
      this.renderer.addClass(this.el.nativeElement, 'text-green-700');
      this.renderer.addClass(this.el.nativeElement, 'ring-green-600/20');
      this.el.nativeElement.innerText = 'Activo';
    } else {
      this.renderer.addClass(this.el.nativeElement, 'bg-red-50');
      this.renderer.addClass(this.el.nativeElement, 'text-red-700');
      this.renderer.addClass(this.el.nativeElement, 'ring-red-600/20');
      this.el.nativeElement.innerText = 'Inactivo';
    }
  }
}
