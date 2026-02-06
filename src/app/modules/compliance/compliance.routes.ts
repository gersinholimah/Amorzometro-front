import { Routes } from '@angular/router';
import { PATH_COMPLIANCE } from '../../shared/constants/routes.constant';

export const COMPLIANCE_ROUTES: Routes = [
  {
    path: PATH_COMPLIANCE.TERMO_DE_USO,
    loadComponent: () =>
      import('./pages/termo-uso/termo-uso').then(
        (m) => m.TermoUso
      )
  },
  {
    path: PATH_COMPLIANCE.POLITICA_PRIVACIDADE,
    loadComponent: () =>
      import('./pages/politica-privacidade/politica-privacidade').then(
        (m) => m.PoliticaPrivacidade
      )
  },
  {
    path: '**',
    redirectTo: PATH_COMPLIANCE.TERMO_DE_USO,
  }
];
