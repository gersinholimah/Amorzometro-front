import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { IDadosDaSessao } from '../interfaces/estrutura.interface';
import { PATH_MODULO } from '../constants/routes.constant';
import { LocalStorageService } from '../service/local-storage.service';

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const dadosDaSessao: IDadosDaSessao | null = localStorageService.getDadosDaSessao();
  const token: string | undefined = dadosDaSessao?.tokenAutenticacao;

  if (!token) {
    return router.createUrlTree([PATH_MODULO.ACESSO]);
  }

  return true;
};
