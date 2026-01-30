import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { IDadosDaSessao } from '../interfaces/estrutura.interface';
import { PATH_MODULO } from '../constants/routes.constant';

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const globalService = inject(GlobalService);
  const dadosDaSessao: IDadosDaSessao | null = globalService.getDadosDaSessao();
  const token: string | undefined = dadosDaSessao?.token;

  if (!token) {
    return router.createUrlTree([PATH_MODULO.ACESSO]);
  }

  return true;
};
