import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasCompras } from './minhas-compras';

describe('MinhasCompras', () => {
  let component: MinhasCompras;
  let fixture: ComponentFixture<MinhasCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasCompras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
