
import { usuarioNaoAutenticadoGuard } from './shared/guards/usuario-nao-autenticado-guard';
import { usuarioAutenticadoGuard } from './shared/guards/usuario-autenticado-guard';
import { PATH_MODULO, ROLES, STATUS } from './shared/constants/routes.constant';
import { Routes } from '@angular/router';
import { perfilGuard } from './shared/guards/perfil-guard';


export const routes: Routes = [

  //  PÚBLICAS
  {
    path: PATH_MODULO.COMPRA,
    loadChildren: () =>
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
      { path: '', redirectTo: PATH_MODULO.CLIENTE, pathMatch: 'full' },
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
