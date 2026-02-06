import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { PAISES_DDI } from '../../constants/paises.constant';
import { PaisDDI } from '../../interfaces/estrutura.interface';

@Component({
  selector: 'app-select-codigo-pais',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './select-codigo-pais.component.html',
  styleUrls: ['./select-codigo-pais.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCodigoPaisComponent),
      multi: true
    }
  ]
})
export class SelectCodigoPaisComponent implements ControlValueAccessor {
  paisesDDI: PaisDDI[] = PAISES_DDI;
  value: string = '';
  isDisabled: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get paisSelecionado(): PaisDDI | undefined {
    return this.paisesDDI.find(p => p.codigo === this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onSelectionChange(event: MatSelectChange): void {
    this.value = event.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
