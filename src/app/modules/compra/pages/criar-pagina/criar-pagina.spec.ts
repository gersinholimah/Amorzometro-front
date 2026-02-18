import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPagina } from './criar-pagina';
import { StorageIndexedDbService } from '../../../../shared/service/storage-indexeddb.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';

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
        { provide: StorageIndexedDbService, useClass: MockStorageIndexedDbService },
        provideNgxMask()
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

  it('should update phone mask based on DDI', () => {
    // Default is +55
    expect(component.telefoneMask).toBe('(00) 0000-0000||(00) 00000-0000');

    // Change to +1 (USA)
    component.form.get('ddi')?.setValue('+1');
    fixture.detectChanges();
    expect(component.telefoneMask).toBe('0*');

    // Change back to +55
    component.form.get('ddi')?.setValue('+55');
    fixture.detectChanges();
    expect(component.telefoneMask).toBe('(00) 0000-0000||(00) 00000-0000');
  });

  it('should limit photos to 9 when adding more than 9', () => {
    // Mock URL.createObjectURL
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = (obj: any) => 'blob:mock';

    try {
      // Create mock files
      const files: File[] = [];
      for (let i = 0; i < 15; i++) {
        files.push(new File([''], `photo${i}.jpg`, { type: 'image/jpeg' }));
      }

      // Mock the event
      const mockEvent = {
        target: {
          files: files,
          value: ''
        }
      } as unknown as Event;

      // Call the method
      component.onSelecionarFotos(mockEvent);

      // Assert
      expect(component.fotos.length).toBe(9);
    } finally {
      // Restore
      URL.createObjectURL = originalCreateObjectURL;
    }
  });

  it('should not add photos if limit of 9 is reached', () => {
    // Mock existing photos
    component.fotos = Array.from({ length: 9 }, (_, i) => ({
      file: new File([''], `existing${i}.jpg`),
      preview: `blob:existing${i}`,
      order: i
    }));

    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = (obj: any) => 'blob:mock';

    try {
      const files = [new File([''], 'new.jpg', { type: 'image/jpeg' })];
      const mockEvent = {
        target: {
          files: files,
          value: ''
        }
      } as unknown as Event;

      component.onSelecionarFotos(mockEvent);

      expect(component.fotos.length).toBe(9);
    } finally {
      URL.createObjectURL = originalCreateObjectURL;
    }
  });
});
