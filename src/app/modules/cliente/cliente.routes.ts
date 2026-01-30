 import { Routes } from '@angular/router';
import { PATH_CLIENTE, PATH_MODULO } from '../../shared/constants/routes.constant';

export const CLIENTE_ROUTES: Routes = [
  {
    path: PATH_CLIENTE.ALTERAR_SENHA,
    loadComponent: () =>
      import('./pages/alterar-senha/alterar-senha').then((m) => m.AlterarSenha),
  },
  {
    path: PATH_CLIENTE.DETALHE_PAGINA,
    loadComponent: () =>
      import('./pages/detalhe-pagina/detalhe-pagina').then(
        (m) => m.DetalhePagina
      )
  },
  {
    path: PATH_CLIENTE.EDITAR_PAGINA,
    loadComponent: () =>
      import('./pages/editar-pagina/editar-pagina').then(
        (m) => m.EditarPagina
      )
  },
  {
    path: PATH_CLIENTE.MEUS_PEDIDOS,
    loadComponent: () =>
      import('./pages/meus-pedidos/meus-pedidos').then(
        (m) => m.MeusPedidos
      ),
  },
  {
    path: PATH_CLIENTE.PERFIL,
    loadComponent: () =>
      import('./pages/perfil/perfil').then(
        (m) => m.Perfil
      ),
  },

  {
    path: '**',
    redirectTo: PATH_CLIENTE.PERFIL,
  }
];
