// import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
//     children: [
//       {
//         path: '',
//         redirectTo: '/messages',
//         pathMatch: 'full'
//       },
//       {
//         path: 'messages',
//         loadComponent: () => import('./features/messages/components/messages-list/messages-list.component')
//           .then(c => c.MessagesListComponent)
//       },
//       {
//         path: 'partners',
//         loadComponent: () => import('./features/partners/components/partners-list/partners-list.component')
//           .then(c => c.PartnersListComponent)
//       }
//     ]
//   }
// ];


import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

// Guard simple pour protéger les routes
const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
};

// Guard pour empêcher l'accès aux pages de login si déjà connecté
const noAuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/messages');
};

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: '/messages',
        pathMatch: 'full'
      },
      {
        path: 'messages',
        loadComponent: () => import('./features/messages/components/messages-list/messages-list.component')
          .then(c => c.MessagesListComponent)
      },
      {
        path: 'partners',
        loadComponent: () => import('./features/partners/components/partners-list/partners-list.component')
          .then(c => c.PartnersListComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/messages'
  }
];