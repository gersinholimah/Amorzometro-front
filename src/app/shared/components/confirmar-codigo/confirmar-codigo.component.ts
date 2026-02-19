import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-confirmar-codigo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './confirmar-codigo.component.html',
  styleUrls: ['./confirmar-codigo.component.css']
})
export class ConfirmarCodigoComponent implements OnInit {
  form: FormGroup;
  @ViewChildren('input') inputs!: QueryList<ElementRef>;
erroBackend = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmarCodigoComponent>
  ) {
    this.form = this.fb.group({
      digits: this.fb.array(
        Array(5).fill('').map(() => new FormControl('', [Validators.required]))
      )
    });
  }

  ngOnInit(): void {}

  get digits(): FormArray {
    return this.form.get('digits') as FormArray;
  }

  onInput(index: number, event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && index < 4) {
      this.inputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onKeyDown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !this.digits.at(index).value && index > 0) {
      this.inputs.get(index - 1)?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text/plain');
    if (clipboardData) {
      const chars = clipboardData.trim().slice(0, 5).split('');
      chars.forEach((char, index) => {
        if (index < 5) {
          this.digits.at(index).setValue(char);
        }
      });
      const focusIndex = Math.min(chars.length, 4);
      setTimeout(() => this.inputs.get(focusIndex)?.nativeElement.focus());
    }
  }

  submit() {
    if (this.form.valid) {
      const code = this.digits.value.join('');
      this.dialogRef.close(code);
    }
  }

  hasError(): boolean {
    const isDirty = this.digits.controls.some(c => c.dirty || c.touched);
    const isInvalid = this.form.invalid;
    return isDirty && isInvalid;
  }
  // Simula erro do backend remover talvez
  setErroBackend() {
  this.erroBackend = true;
  this.form.reset();
  setTimeout(() => {
    this.inputs.first?.nativeElement.focus();
  });
}
}
