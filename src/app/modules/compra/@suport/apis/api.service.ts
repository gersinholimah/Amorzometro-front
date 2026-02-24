import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { GlobalService } from '../../../../shared/service/global.service';
import { firstValueFrom } from 'rxjs';
/**/
// import { IAutenticaEmailResposta } from './../interfaces/resposta.interface';
 import { AuthService } from '../../../../shared/service/auth.service';
import { IAutenticarEmailRequisicao, IRegistrarUsuarioRequisicao } from '../interfaces/requisicao.interface';
import { IRegistraUsuarioResposta } from '../interfaces/resposta.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly endpoints = {
    AutenticaEmail:  ()=>
      `${environment.api_url}/api/v1/autenticacao/autenticar-email`,
    RegistrarUsuario:  ()=>
      `${environment.api_url}/api/v1/usuario/registrar`,

  }
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private authService: AuthService,
  ) { }


  async postAutenticaEmail(email: IAutenticarEmailRequisicao): Promise<string> {
    const endpoint = this.endpoints.AutenticaEmail();
    return firstValueFrom(
      this.http.post<string>(endpoint, email, this.authService.defineOCabecalho())
    );
  }
  async postRegistrarUsuario(usuario: IRegistrarUsuarioRequisicao): Promise<IRegistraUsuarioResposta> {
    const endpoint = this.endpoints.RegistrarUsuario();
    return firstValueFrom(
      this.http.post<IRegistraUsuarioResposta>(endpoint, usuario, this.authService.defineOCabecalho())
    );
  }

/**/
}
