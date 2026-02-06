import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVideoYoutubeComponent } from './lista-video-youtube';

describe('ListaVideoYoutubeComponent', () => {
  let component: ListaVideoYoutubeComponent;
  let fixture: ComponentFixture<ListaVideoYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVideoYoutubeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaVideoYoutubeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
