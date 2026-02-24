import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent, ModalData } from './modal.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let dialogRefSpy: { close: any };

  const mockData: ModalData = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
    type: 'success',
    showCancelButton: true,
    showConfirmButton: true,
    showOkButton: true,
    showCloseIcon: true
  };

  beforeEach(async () => {
    dialogRefSpy = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ModalComponent, MatDialogModule, CommonModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title, subtitle, and description from data', () => {
    const titleEl = fixture.debugElement.query(By.css('.modal-title')).nativeElement;
    const subtitleEl = fixture.debugElement.query(By.css('.modal-subtitle')).nativeElement;
    const descEl = fixture.debugElement.query(By.css('.modal-description')).nativeElement;

    expect(titleEl.textContent).toContain('Test Title');
    expect(subtitleEl.textContent).toContain('Test Subtitle');
    expect(descEl.textContent).toContain('Test Description');
  });

  it('should call dialogRef.close(true) when confirm button is clicked', () => {
    const confirmBtn = fixture.debugElement.query(By.css('.btn-confirm'));
    confirmBtn.nativeElement.click();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close(false) when cancel button is clicked', () => {
    const cancelBtn = fixture.debugElement.query(By.css('.btn-cancel'));
    cancelBtn.nativeElement.click();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should call dialogRef.close() when ok button is clicked', () => {
    const okBtn = fixture.debugElement.query(By.css('.btn-ok'));
    okBtn.nativeElement.click();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should call dialogRef.close() when close icon is clicked', () => {
    const closeBtn = fixture.debugElement.query(By.css('.close-btn'));
    closeBtn.nativeElement.click();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should show correct icon for success type', () => {
    const icon = fixture.debugElement.query(By.css('.status-icon.success'));
    expect(icon).toBeTruthy();
  });
});
