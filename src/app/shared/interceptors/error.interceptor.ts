import { IErroGenerico } from '../interfaces/api-resposta.interface';
import { GlobalService } from '../service/global.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ERROS_TRATADOS_LOCALMENTE } from '../constants/erros-tratados-localmente';
import { CODIGO_ERRO_API } from '../constants/codigo-erro-api.constant';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private globalService: GlobalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(

      catchError((error: HttpErrorResponse) => {

        const status = error.status;
        const erroGenericoApiBusiness = error.error as IErroGenerico | null;
        const businessCode = erroGenericoApiBusiness?.code ? erroGenericoApiBusiness.code : 0;

        // 🔴 ERROS 500+
        if (status >= 500) {

          console.error('Erro servidor:', {
            metodo: req.method,
            url: req.url,
            status
          });

          this.globalService.exibeAlertaErro(
            'Erro no servidor',
            `${req.method} | ${req.url}`
          );

          return throwError(() => error);
        }

        // 🟡 ERROS 400
        if (status >= 400 && status < 500) {

          // 👉 Se for tratado no componente
          if (ERROS_TRATADOS_LOCALMENTE.includes(businessCode)) {
            return throwError(() => error);
          }

          // 👉 Erro de validação
          if (businessCode === CODIGO_ERRO_API.Helpers.ErroValidacao) {

            this.globalService.exibeAlertaErro(
              erroGenericoApiBusiness?.message,
              erroGenericoApiBusiness?.data?.[0]
            );

            return throwError(() => error);
          }

          // 👉 Erro de negócio comum
          if (businessCode) {

            this.globalService.exibeAlertaErro(
              erroGenericoApiBusiness?.message,
              `Tente novamente. Código do erro: ${businessCode}`
            );

            return throwError(() => error);
          }

          // 👉 Fallback 400
          this.globalService.exibeAlertaErro(
            'Erro na requisição',
            `${req.method} | ${req.url}`
          );

          return throwError(() => error);
        }

        return throwError(() => error);
      })
    );
  }
}
