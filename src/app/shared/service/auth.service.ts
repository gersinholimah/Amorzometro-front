import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { IDadosDaSessao } from '../interfaces/estrutura.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headerOptions = {};


  constructor(
    private globalService: GlobalService,
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
    const dadosDaSessao: IDadosDaSessao | null = this.globalService.getDadosDaSessao();
    const token: string | undefined = dadosDaSessao?.token;
    return token ? `Bearer ${token}` : '';
  }
}
