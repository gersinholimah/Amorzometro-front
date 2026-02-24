import { Injectable } from '@angular/core';
import { IDadosDaSessao } from '../interfaces/estrutura.interface';
import { STORAGE } from '../constants/storage.constant';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() {}

  /* ================================
     MÉTODOS GENÉRICOS
  ================================= */

  getLocalStorage<T>(chave: string): T | null {
    const item = localStorage.getItem(chave);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  setLocalStorage<T>(chave: string, valor: T): void {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  removeLocalStorage(chave: string): void {
    localStorage.removeItem(chave);
  }

  /* ================================
     SESSÃO
  ================================= */

  getDadosDaSessao(): IDadosDaSessao | null {
    return this.getLocalStorage<IDadosDaSessao>(
      STORAGE.DADOS_DA_SESSAO
    );
  }

  setDadosDaSessao(dados: IDadosDaSessao): void {
    this.setLocalStorage(STORAGE.DADOS_DA_SESSAO, dados);
  }

  atualizarDadosDaSessao(
    novosDados: Partial<IDadosDaSessao>
  ): void {

    const dadosAtuais = this.getDadosDaSessao() ?? {} as IDadosDaSessao;

    const dadosAtualizados: IDadosDaSessao = {
      ...dadosAtuais,
      ...novosDados
    };

    this.setDadosDaSessao(dadosAtualizados);
  }

  limparSessaoCompleta(): void {
    this.removeLocalStorage(STORAGE.DADOS_DA_SESSAO);
  }

}
