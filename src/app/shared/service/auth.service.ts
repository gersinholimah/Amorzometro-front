import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { IDadosDaSessao } from '../interfaces/estrutura.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headerOptions = {};


  constructor(
    private globalService: GlobalService,
    private localStorageService: LocalStorageService,
  ) { }


  defineOCabecalho() {
   this.headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.getAuthToken(),
      }),
    };

    return this.headerOptions;
  }
  getAuthToken(): string {
    const dadosDaSessao: IDadosDaSessao | null = this.localStorageService.getDadosDaSessao();
    const token: string | undefined = dadosDaSessao?.tokenAutenticacao;
    return token ? `Bearer ${token}` : '';
  }
}
