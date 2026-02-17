import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPagina } from './criar-pagina';
import { StorageIndexedDbService } from '../../../../shared/service/storage-indexeddb.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockStorageIndexedDbService {
  async get(id: string) { return undefined; }
  async save(data: any) { return undefined; }
}

describe('CriarPagina', () => {
  let component: CriarPagina;
  let fixture: ComponentFixture<CriarPagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarPagina, BrowserAnimationsModule],
      providers: [
        { provide: StorageIndexedDbService, useClass: MockStorageIndexedDbService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarPagina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
