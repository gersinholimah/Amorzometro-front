import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVideoYoutube } from './lista-video-youtube';

describe('ListaVideoYoutube', () => {
  let component: ListaVideoYoutube;
  let fixture: ComponentFixture<ListaVideoYoutube>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVideoYoutube]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaVideoYoutube);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
