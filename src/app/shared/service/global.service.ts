import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ROTAS } from '../constants/routes.constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDadosDaSessao } from '../interfaces/estrutura.interface';
import { STORAGE } from '../constants/storage.constant';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

    getDadosDaSessao(): IDadosDaSessao | null {
    const dadosDaSessaoEmString: string | null = this.getLocalStorage(
      STORAGE.DADOS_DA_SESSAO
    );
    if (dadosDaSessaoEmString) {
      return JSON.parse(dadosDaSessaoEmString);
    }
    return null;
  }


  getLocalStorage(nomeLocalStorage: string): string | null {
    const dadosLocalStorage: string | null =
      localStorage.getItem(nomeLocalStorage);
    if (dadosLocalStorage) {
      return dadosLocalStorage;
    }
    return null;
  }
}
