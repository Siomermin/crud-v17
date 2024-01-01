import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  public menuItems = signal<MenuItem[]>([
    { title: 'Lista', route: 'lista' },
    { title: 'Alta', route: 'alta' },
  ]);
}
