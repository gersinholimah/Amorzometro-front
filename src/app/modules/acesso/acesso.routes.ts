 import { Routes } from '@angular/router';
import { PATH_ACESSO, PATH_MODULO } from '../../shared/constants/routes.constant';

export const ACESSO_ROUTES: Routes = [
  {
    path: PATH_ACESSO.LOGIN,
    loadComponent: () =>
      import('./pages/login/login').then(
        (m) => m.Login
      )
  },
  {
    path: PATH_ACESSO.RECUPERAR_SENHA,
    loadComponent: () =>
      import('./pages/recuperar-senha/recuperar-senha').then(
        (m) => m.RecuperarSenha
      )
  },
  {
    path: '**',
    redirectTo: PATH_ACESSO.LOGIN,
  }
];
