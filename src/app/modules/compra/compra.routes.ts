 import { Routes } from '@angular/router';
import { PATH_ACESSO, PATH_COMPRA, PATH_MODULO } from '../../shared/constants/routes.constant';

export const COMPRA_ROUTES: Routes = [
  {
    path: PATH_COMPRA.CRIAR_PAGINA,
    loadComponent: () =>
      import('./pages/criar-pagina/criar-pagina').then(
        (m) => m.CriarPagina
      )
  },
  {
    path: PATH_COMPRA.PAGAMENTO,
    loadComponent: () =>
      import('./pages/pagamento/pagamento').then(
        (m) => m.Pagamento
      )
  },
  {
    path: '**',
    redirectTo: PATH_COMPRA.CRIAR_PAGINA,
  }
];
