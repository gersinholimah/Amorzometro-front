import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPagina } from './criar-pagina';

describe('CriarPagina', () => {
  let component: CriarPagina;
  let fixture: ComponentFixture<CriarPagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarPagina]
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
