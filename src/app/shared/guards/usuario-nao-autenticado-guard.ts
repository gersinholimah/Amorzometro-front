import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { PATH_MODULO, ROLES, STATUS } from '../constants/routes.constant';

export const usuarioNaoAutenticadoGuard: CanActivateFn = () => {
  const router = inject(Router);
  const globalService = inject(GlobalService);

  const dadosDaSessao = globalService.getDadosDaSessao();
  const token = dadosDaSessao?.token;

  if (!token) {
    return true; // lead pode acessar
  }

  // usuário logado → redireciona pelo perfil
  if (dadosDaSessao.role === ROLES.ADMIN) {
    return router.createUrlTree([STATUS.AUTENTICADO, PATH_MODULO.ADMIN]);
  }

  return router.createUrlTree([STATUS.AUTENTICADO, PATH_MODULO.CLIENTE]);
};
