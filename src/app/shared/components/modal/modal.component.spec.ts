import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    // We do NOT call fixture.detectChanges() here to avoid initial rendering
    // preventing ExpressionChangedAfterItHasBeenCheckedError when we set inputs immediately in tests.
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display title, subtitle, and description', () => {
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    component.description = 'Test Description';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.modal-title')).nativeElement;
    const subtitleEl = fixture.debugElement.query(By.css('.modal-subtitle')).nativeElement;
    const descEl = fixture.debugElement.query(By.css('.modal-description')).nativeElement;

    expect(titleEl.textContent).toContain('Test Title');
    expect(subtitleEl.textContent).toContain('Test Subtitle');
    expect(descEl.textContent).toContain('Test Description');
  });

  it('should emit confirm(true) when confirm button is clicked', () => {
    component.showConfirmButton = true;
    fixture.detectChanges();

    const spy = vi.spyOn(component.confirm, 'emit');

    const confirmBtn = fixture.debugElement.query(By.css('.btn-confirm'));
    confirmBtn.nativeElement.click();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should emit confirm(false) when cancel button is clicked', () => {
    component.showCancelButton = true;
    fixture.detectChanges();

    const spy = vi.spyOn(component.confirm, 'emit');

    const cancelBtn = fixture.debugElement.query(By.css('.btn-cancel'));
    cancelBtn.nativeElement.click();

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should emit close() when ok button is clicked', () => {
    component.showOkButton = true;
    fixture.detectChanges();

    const spy = vi.spyOn(component.close, 'emit');

    const okBtn = fixture.debugElement.query(By.css('.btn-ok'));
    okBtn.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit close() when close icon is clicked', () => {
    component.showCloseIcon = true;
    fixture.detectChanges();

    const spy = vi.spyOn(component.close, 'emit');

    const closeBtn = fixture.debugElement.query(By.css('.close-btn'));
    closeBtn.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit close() when backdrop is clicked', () => {
    fixture.detectChanges();

    const spy = vi.spyOn(component.close, 'emit');

    const backdrop = fixture.debugElement.query(By.css('.modal-backdrop'));

    // Simulate click on backdrop
    backdrop.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit close() when modal container is clicked', () => {
    fixture.detectChanges();

    const spy = vi.spyOn(component.close, 'emit');

    const container = fixture.debugElement.query(By.css('.modal-container'));

    // Simulate click on container
    container.nativeElement.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should show correct icon for success type', () => {
    component.type = 'success';
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.status-icon.success'));
    expect(icon).toBeTruthy();
  });

  it('should show correct icon for error type', () => {
    component.type = 'error';
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.status-icon.error'));
    expect(icon).toBeTruthy();
  });
});
