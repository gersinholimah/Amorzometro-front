import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick($event)">
      <div class="modal-container">
        <div class="modal-header">
          <button *ngIf="showCloseIcon" class="close-btn" (click)="onClose()" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="icon-container" [ngClass]="type">
            <!-- Success Icon -->
            <svg *ngIf="type === 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="status-icon success">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>

            <!-- Error Icon -->
            <svg *ngIf="type === 'error'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="status-icon error">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>

            <!-- Warning Icon -->
            <svg *ngIf="type === 'warning'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="status-icon warning">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>

          <h2 *ngIf="title" class="modal-title">{{ title }}</h2>
          <h3 *ngIf="subtitle" class="modal-subtitle">{{ subtitle }}</h3>
          <p *ngIf="description" class="modal-description">{{ description }}</p>
        </div>

        <div class="modal-footer">
          <button *ngIf="showCancelButton" class="btn btn-cancel" (click)="onCancel()">Cancelar</button>
          <button *ngIf="showConfirmButton" class="btn btn-confirm" (click)="onConfirm()">Confirmar</button>
          <button *ngIf="showOkButton" class="btn btn-ok" (click)="onOk()">OK</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(2px);
    }

    .modal-container {
      background: #ffffff;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      width: 90%;
      max-width: 450px;
      display: flex;
      flex-direction: column;
      position: relative;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      color: #666;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      background-color: #f0f0f0;
      color: #333;
    }

    .modal-body {
      text-align: center;
      margin-bottom: 24px;
    }

    .icon-container {
      margin-bottom: 16px;
      display: flex;
      justify-content: center;
    }

    .status-icon {
      width: 64px;
      height: 64px;
    }

    .status-icon.success {
      color: #28a745;
    }

    .status-icon.error {
      color: #dc3545;
    }

    .status-icon.warning {
      color: #ffc107;
    }

    .modal-title {
      margin: 0 0 8px;
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
    }

    .modal-subtitle {
      margin: 0 0 12px;
      font-size: 1.1rem;
      font-weight: 500;
      color: #555;
    }

    .modal-description {
      margin: 0;
      font-size: 0.95rem;
      color: #666;
      line-height: 1.5;
    }

    .modal-footer {
      display: flex;
      justify-content: center;
      gap: 12px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;
      font-weight: 500;
    }

    .btn:hover {
      opacity: 0.9;
    }

    .btn-cancel {
      background-color: #e0e0e0;
      color: #333;
    }

    .btn-confirm {
      background-color: #007bff;
      color: white;
    }

    .btn-ok {
      background-color: #007bff;
      color: white;
    }
  `]
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() description: string = '';
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() showCancelButton: boolean = true;
  @Input() showConfirmButton: boolean = true;
  @Input() showOkButton: boolean = false;
  @Input() showCloseIcon: boolean = true;

  @Output() confirm = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit(true);
  }

  onCancel(): void {
    this.confirm.emit(false);
  }

  onOk(): void {
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
