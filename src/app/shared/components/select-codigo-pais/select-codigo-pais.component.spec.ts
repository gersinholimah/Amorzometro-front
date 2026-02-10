import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCodigoPaisComponent } from './select-codigo-pais.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectCodigoPaisComponent', () => {
  let component: SelectCodigoPaisComponent;
  let fixture: ComponentFixture<SelectCodigoPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCodigoPaisComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCodigoPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
