import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { GlobalService } from '../../../../shared/service/global.service';
import { firstValueFrom } from 'rxjs';
/**/
import { IAutenticaEmailResposta } from './../interfaces/resposta.interface';
 import { AuthService } from '../../../../shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly endpoints = {
    AutenticaUsuario:  ()=>
      `${environment.api_url}/api/v1/autenticacao/autenticar-email`,
  }
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private authService: AuthService,
  ) { }


  async SetAutenticaEmail(email: string): Promise<IAutenticaEmailResposta> {
    const endpoint = this.endpoints.AutenticaUsuario();
    return firstValueFrom(
      this.http.post<IAutenticaEmailResposta>(endpoint, JSON.stringify(email), this.authService.defineOCabecalho())
    );
  }

/**/
}
