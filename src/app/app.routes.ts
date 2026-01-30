


import { usuarioNaoAutenticadoGuard } from './shared/guards/usuario-nao-autenticado-guard';
import { usuarioAutenticadoGuard } from './shared/guards/usuario-autenticado-guard';
import { PATH_MODULO, ROLES, ROTAS, STATUS } from './shared/constants/routes.constant';
import { Routes } from '@angular/router';
import { CriarPagina } from './modules/compra/pages/criar-pagina/criar-pagina';
import { Pagamento } from './modules/compra/pages/pagamento/pagamento';
import { perfilGuard } from './shared/guards/perfil-guard';
import { ACESSO_ROUTES } from './modules/acesso/acesso.routes';


export const routes: Routes = [

  //  PÚBLICAS
  {
    path: PATH_MODULO.COMPRA,
    children: [
      {
        loadChildren: () =>//loadComponent
          import('./modules/compra/compra.routes').then(m => m.COMPRA_ROUTES),
      }
    ]
  },

  {
    path: PATH_MODULO.ACESSO,
    canActivate: [usuarioNaoAutenticadoGuard],
    children: [
      {
        loadChildren: () =>
          import('./modules/acesso/acesso.routes').then(m => m.ACESSO_ROUTES)
      },]
  },

  //AUTENTICADAS
  {
    path: STATUS.AUTENTICADO,
    canActivate: [usuarioAutenticadoGuard],
    children: [

      {
        path: PATH_MODULO.CLIENTE,
        loadChildren: () =>
          import('./modules/cliente/cliente.routes')
            .then(m => m.CLIENTE_ROUTES),
        canActivate: [perfilGuard],
        data: { roles: [ROLES.CLIENTE] }
      },

      {
        path: PATH_MODULO.ADMIN,
        loadChildren: () =>
          import('./modules/admin/admin.routes')
            .then(m => m.ADMIN_ROUTES),
        canActivate: [perfilGuard],
        data: { roles: [ROLES.ADMIN] }
      },
    ],
  },

  { path: '**', redirectTo: PATH_MODULO.ACESSO },
];










/*
export const routes: Routes = [
  {
    path: PATH_MODULO.ACESSO,
    loadComponent: () =>
      import('./modules/acesso/pages/login/login').then(
        (m) => m.Login
      ),
    canActivate: [usuarioNaoAutenticadoGuard],
  },
    {
    path: PATH_MODULO.COMPRA,
    loadComponent: () =>
      import('./modules/compra/pages/pagamento/pagamento').then(
        (m) => m.Pagamento
      ),
    canActivate: [usuarioNaoAutenticadoGuard],
  },
      {
    path: PATH_MODULO.ACESSO,
    loadComponent: () =>
      import('./modules/acesso/pages/login/login').then(
        (m) => m.Login
      ),
    canActivate: [usuarioNaoAutenticadoGuard],
  },
        {
    path: PATH_MODULO.ACESSO,
    loadComponent: () =>
      import('./modules/acesso/pages/recuperar-senha/recuperar-senha').then(
        (m) => m.RecuperarSenha
      ),
    canActivate: [usuarioNaoAutenticadoGuard],
  },

  {
    path: STATUS.AUTENTICADO,
    canActivate: [usuarioAutenticadoGuard],
    children: [
      {
        path: PATH_MODULO.CLIENTE,
        loadChildren: () =>
          import('./modules/area-cliente/area-cliente.router').then(
            (m) => m.AREA_CLIENTE_ROUTES),
      },
      {
        path: PATH_MODULO.ADMINISTRADOR,
        loadChildren: () =>
          import('./modules/administracao/administracao.router').then(
            (m) => m.ADMINISTRACAO_ROUTES),
      },
      { path: '', redirectTo: PATH_MODULO.COMPRA, pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: PATH_MODULO.ACESSO },
];
*/
