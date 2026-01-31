import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { GlobalService } from '../../../../shared/service/global.service';
import { firstValueFrom } from 'rxjs';

  import { ILoginRequisicao } from '../interfaces/requisicao.interface';
import { ILoginResposta } from '../interfaces/resposta.interface';

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
  ) { }

  async setAutenticaUsuario(dadosParaAutenticacao: ILoginRequisicao): Promise<ILoginResposta> {
    const endpoint = this.endpoints.AutenticaUsuario();
    return firstValueFrom(
      this.http.post<ILoginResposta>(endpoint, JSON.stringify(dadosParaAutenticacao), this.globalService.defineOCabecalho())
    );
  }
}
