import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 400) {
          console.log('Erro esperado:', error.error);
        }

        if (error.status === 401) {
          console.log('Não autorizado');
        }

        if (error.status === 500) {
          console.error('Erro interno do servidor');
        }

        return throwError(() => error);
      })
    );
  }
}
