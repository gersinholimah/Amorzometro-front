import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoUso } from './termo-uso';

describe('TermoUso', () => {
  let component: TermoUso;
  let fixture: ComponentFixture<TermoUso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermoUso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermoUso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
