import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { PATH_MODULO, ROLES, STATUS } from '../constants/routes.constant';
import { LocalStorageService } from '../service/local-storage.service';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const globalService = inject(LocalStorageService);

  const sessao = globalService.getDadosDaSessao();
  const rolesPermitidos: string[] = route.data?.['roles'];

  // segurança extra (não deveria acontecer, mas previne bug)
  if (!sessao?.tokenAutenticacao) {
    return router.createUrlTree([PATH_MODULO.ACESSO]);
  }

  // ADMIN pode acessar tudo
  if (sessao.role === ROLES.ADMIN) {
    return true;
  }

  // rota exige role e o usuário não tem
  if (rolesPermitidos && !rolesPermitidos.includes(sessao.role)) {
    return router.createUrlTree([STATUS.AUTENTICADO, PATH_MODULO.CLIENTE]);
  }

  return true;
};
