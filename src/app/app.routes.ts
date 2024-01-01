import { Routes } from '@angular/router';

// -Estructura básica:
// App
// |__ features
// | |__ cliente
// |__ models
// | |__ cliente
// |__ services

export const routes: Routes = [
  {
    path: 'clientes',
    loadComponent: () => import('./features/cliente/pages/main-page/main-page.component'),
    children: [
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
      },
      {
        path: 'alta',
        loadComponent: () => import('./features/cliente/components/nuevo-cliente/nuevo-cliente-page.component'),
      },
      {
        path: 'editar/:codigo',
        loadComponent: () => import('./features/cliente/components/nuevo-cliente/nuevo-cliente-page.component'),
      },
      {
        path: 'lista',
        loadComponent: () => import('./features/cliente/components/tabla-cliente/tabla-cliente.component'),
      },
      {
        path: '**',
        redirectTo: 'lista',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'clientes',
    pathMatch: 'full',
  },
];
