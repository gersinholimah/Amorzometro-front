import { Injectable } from '@angular/core';
import { CriarPaginaStorage } from '../interfaces/estrutura.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageIndexdDbService {
  private readonly DB_NAME = 'app-db';
  private readonly DB_VERSION = 1;
  private readonly STORE_NAME = 'criar-pagina';

  private db!: IDBDatabase;

  //  Inicializa o banco
  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      request.onerror = () => reject(request.error);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
    });
  }

  //  Salvar draft
  async save(data: CriarPaginaStorage): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Buscar por id
  async get(id: string): Promise<CriarPaginaStorage | undefined> {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.STORE_NAME, 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Remover draft
  async delete(id: string): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Limpar tudo (opcional)
  async clear(): Promise<void> {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
