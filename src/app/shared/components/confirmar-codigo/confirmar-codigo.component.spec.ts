import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarCodigoComponent } from './confirmar-codigo.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmarCodigoComponent', () => {
  let component: ConfirmarCodigoComponent;
  let fixture: ComponentFixture<ConfirmarCodigoComponent>;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockDialogRef = {
      close: (val: any) => {}
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmarCodigoComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 digits controls', () => {
    expect(component.digits.length).toBe(5);
  });

  it('should be invalid initially', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('should be valid when all digits are filled', () => {
    component.digits.controls.forEach(c => c.setValue('1'));
    expect(component.form.valid).toBeTruthy();
  });

  it('should close dialog with code on submit if valid', () => {
    let closedWith = '';
    mockDialogRef.close = (val: any) => { closedWith = val; };

    component.digits.controls.forEach(c => c.setValue('1'));
    component.submit();
    expect(closedWith).toBe('11111');
  });

  it('should not close dialog if invalid', () => {
    let closed = false;
    mockDialogRef.close = (val: any) => { closed = true; };

    component.submit();
    expect(closed).toBe(false);
  });
});
