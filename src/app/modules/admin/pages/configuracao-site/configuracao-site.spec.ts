import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoSite } from './configuracao-site';

describe('ConfiguracaoSite', () => {
  let component: ConfiguracaoSite;
  let fixture: ComponentFixture<ConfiguracaoSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracaoSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoSite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
