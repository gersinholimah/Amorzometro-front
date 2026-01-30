import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPagina } from './editar-pagina';

describe('EditarPagina', () => {
  let component: EditarPagina;
  let fixture: ComponentFixture<EditarPagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPagina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPagina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
