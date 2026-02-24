import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { PATH_MODULO, ROLES, STATUS } from '../constants/routes.constant';
import { LocalStorageService } from '../service/local-storage.service';

export const usuarioNaoAutenticadoGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const dadosDaSessao = localStorageService.getDadosDaSessao();
  const token = dadosDaSessao?.tokenAutenticacao;

  if (!token) {
    return true; // lead pode acessar
  }

  // usuário logado → redireciona pelo perfil
  if (dadosDaSessao.role === ROLES.ADMIN) {
    return router.createUrlTree([STATUS.AUTENTICADO, PATH_MODULO.ADMIN]);
  }

  return router.createUrlTree([STATUS.AUTENTICADO, PATH_MODULO.CLIENTE]);
};
