import { Routes } from '@angular/router';
import { PATH_ADMIN } from '../../shared/constants/routes.constant';

export const ADMIN_ROUTES: Routes = [
  {
    path: PATH_ADMIN.CONFIGURACAO_SITE,
    loadComponent: () =>
      import('./pages/configuracao-site/configuracao-site').then((m) => m.ConfiguracaoSite),
  },
  {
    path: PATH_ADMIN.DASHBOARD,
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
    {
    path: PATH_ADMIN.PAGAMENTOS,
    loadComponent: () =>
      import('./pages/pagamentos/pagamentos').then((m) => m.Pagamentos),
  },
    {
    path: PATH_ADMIN.PLANOS,
    loadComponent: () =>
      import('./pages/planos/planos').then((m) => m.Planos),
  },
     {
    path: PATH_ADMIN.USUARIOS,
    loadComponent: () =>
      import('./pages/usuarios/usuarios').then((m) => m.Usuarios),
  },
  {
    path: '**',
    redirectTo: PATH_ADMIN.DASHBOARD,
  },
];
