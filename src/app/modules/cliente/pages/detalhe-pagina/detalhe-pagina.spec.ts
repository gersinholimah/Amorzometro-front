import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePagina } from './detalhe-pagina';

describe('DetalhePagina', () => {
  let component: DetalhePagina;
  let fixture: ComponentFixture<DetalhePagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhePagina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhePagina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
