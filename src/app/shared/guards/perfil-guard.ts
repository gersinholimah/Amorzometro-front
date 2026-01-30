import { CanActivateFn } from '@angular/router';

export const perfilGuard: CanActivateFn = (route, state) => {
  return true;
};
