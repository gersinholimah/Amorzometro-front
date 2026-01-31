import { Login } from './modules/acesso/pages/login/login';



import { usuarioNaoAutenticadoGuard } from './shared/guards/usuario-nao-autenticado-guard';
import { usuarioAutenticadoGuard } from './shared/guards/usuario-autenticado-guard';
import { PATH_MODULO, ROLES, ROTAS, STATUS } from './shared/constants/routes.constant';
import { Routes, RouterModule } from '@angular/router';
import { CriarPagina } from './modules/compra/pages/criar-pagina/criar-pagina';
import { Pagamento } from './modules/compra/pages/pagamento/pagamento';
import { roleGuard } from './shared/guards/role-guard';
import { ACESSO_ROUTES } from './modules/acesso/acesso.routes';
import { Home } from './modules/home/pages/home/home';


export const routes: Routes = [

  //  PÚBLICAS
// { path: '', pathMatch: 'full', redirectTo: PATH_MODULO.HOME},
{ path: '', component: Home},
{ path: 'home', component: Home},
{
  path: PATH_MODULO.ADMIN, loadComponent: () =>
    import('./modules/admin/pages/dashboard/dashboard').then(m => m.Dashboard)
},
{
    path: PATH_MODULO.COMPRA,

        loadChildren: () =>//loadComponent
          import('./modules/compra/compra.routes').then(m => m.COMPRA_ROUTES),

  },

  {
    path: PATH_MODULO.ACESSO,
    canActivate: [usuarioNaoAutenticadoGuard],
        loadChildren: () =>
          import('./modules/acesso/acesso.routes').then(m => m.ACESSO_ROUTES)
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
  },/**/

  { path: '**', redirectTo: '' }
    // { path: '**', redirectTo: PATH_MODULO.ACESSO },


];






