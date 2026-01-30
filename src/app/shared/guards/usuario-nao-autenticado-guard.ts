import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IDadosDaSessao } from '../interfaces/estrutura.interface';
import { GlobalService } from '../service/global.service';
import { STATUS } from '../constants/routes.constant';

export const usuarioNaoAutenticadoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const globalService = inject(GlobalService);

  const dadosDaSessao: IDadosDaSessao | null = globalService.getDadosDaSessao();
  const token = dadosDaSessao?.token;

  if (token) {
    return router.createUrlTree([STATUS.AUTENTICADO]);
  }

  return true;
};
