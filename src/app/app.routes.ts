


import { usuarioNaoAutenticadoGuard } from './shared/guards/usuario-nao-autenticado-guard';
import { usuarioAutenticadoGuard } from './shared/guards/usuario-autenticado-guard';
import { PATH_MODULO, ROLES, ROTAS, STATUS } from './shared/constants/routes.constant';
import { Routes } from '@angular/router';
import { CriarPagina } from './modules/compra/pages/criar-pagina/criar-pagina';
import { Pagamento } from './modules/compra/pages/pagamento/pagamento';
import { roleGuard } from './shared/guards/role-guard';
import { ACESSO_ROUTES } from './modules/acesso/acesso.routes';


export const routes: Routes = [

  //  PÚBLICAS
{
  path: '',
  redirectTo: PATH_MODULO.HOME,
  pathMatch: 'full'
},
{
  path: PATH_MODULO.HOME,
  loadComponent: () =>
    import('./modules/home/pages/home/home').then(m => m.Home)
},
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
    path: PATH_MODULO.COMPLIANCE,
    loadChildren: () =>
      import('./modules/compliance/compliance.routes').then(m => m.COMPLIANCE_ROUTES),
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
        canActivate: [roleGuard],
        data: { roles: [ROLES.CLIENTE] }
      },

      {
        path: PATH_MODULO.ADMIN,
        loadChildren: () =>
          import('./modules/admin/admin.routes')
            .then(m => m.ADMIN_ROUTES),
        canActivate: [roleGuard],
        data: { roles: [ROLES.ADMIN] }
      },
    ],
  },

  { path: '**', redirectTo: '' }


];






