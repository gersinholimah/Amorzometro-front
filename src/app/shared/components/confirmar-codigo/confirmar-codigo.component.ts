import { Component, ElementRef, EventEmitter, OnInit,OnDestroy, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { interval, Subscription } from 'rxjs';
import { CODIGO_OTA } from '../../constants/respostas-ota.constant';
import { LocalStorageService } from '../../service/local-storage.service';
import { ChangeDetectorRef } from '@angular/core';

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
erro: string | null = null;
@Output() respostaOta = new EventEmitter<number>();
  tempoRestante = 420; // 7 minutos em segundos
  contadorFormatado:string ='';
  tempoExpirado:boolean = false;
  private timerSub!: Subscription;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmarCodigoComponent>,
    private localStorageService: LocalStorageService,
    private changeDetectorRef: ChangeDetectorRef

  ) {
    this.form = this.fb.group({
      digits: this.fb.array(
        Array(5).fill('').map(() => new FormControl('', [Validators.required]))
      )
    });
  }

ngOnInit(): void {
  this.carregarTempoDoLocalStorage();

  if (!this.tempoExpirado) {
    this.iniciarContador();
  }
}

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

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
  if (this.form.invalid || this.tempoExpirado) return;

  const code = this.digits.value.join('');
  this.respostaOta.emit(code);
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





private iniciarContador(): void {
  this.timerSub = interval(1000).subscribe(() => {
    this.atualizarTempoReal();
  });
}

private atualizarTempoReal(): void {
  const sessao = this.localStorageService.getDadosDaSessao();
  if (!sessao?.codigoValidacaoEmailTime) return;

  const momentoEnvio = new Date(sessao.codigoValidacaoEmailTime).getTime();
  const agora = new Date().getTime();

  const tempoTotal = 420;

  const diferenca = Math.floor((agora - momentoEnvio) / 1000);

  this.tempoRestante = Math.max(tempoTotal - diferenca, 0);

  if (this.tempoRestante === 0) {
    this.tempoExpirado = true;
    this.timerSub.unsubscribe();
  }

  this.atualizarContador();

  this.changeDetectorRef.detectChanges();   // <<< FALTA ISSO
}
/*
  private iniciarContador(): void {
    this.timerSub = interval(1000).subscribe(() => {

      if (this.tempoRestante > 0) {
        this.tempoRestante--;
        this.atualizarContador();
        this.changeDetectorRef.detectChanges()
      } else {
        this.tempoExpirado = true;
        this.timerSub.unsubscribe();
        this.changeDetectorRef.detectChanges()
      }

    });
  }*/


  private atualizarContador(): void {
    const minutos = Math.floor(this.tempoRestante / 60);
    const segundos = this.tempoRestante % 60;

    this.contadorFormatado =
      `${this.formatar(minutos)}:${this.formatar(segundos)}`;
  }
  private formatar(valor: number): string {
    return valor < 10 ? `0${valor}` : `${valor}`;
  }
 reenviarCodigo(): void {
    this.tempoExpirado = false;
    this.erroBackend = true;
 this.erro = null;

  // Limpa os campos do OTP
  this.form.reset();

  // Opcional: limpa estados de validação
  this.digits.controls.forEach(control => {
    control.setErrors(null);
    control.markAsPristine();
    control.markAsUntouched();
  });

  // Volta o foco para o primeiro campo
  setTimeout(() => {
    this.inputs.first?.nativeElement.focus();
  });


    this.tempoRestante = 420;
    this.atualizarContador();
      this.timerSub?.unsubscribe(); // evita múltiplos timers

    this.iniciarContador();
       this.respostaOta.emit(CODIGO_OTA.REENVIAR);

  }




private carregarTempoDoLocalStorage(): void {
  const sessao = this.localStorageService.getDadosDaSessao();

  if (!sessao?.codigoValidacaoEmailTime) return;

  const momentoEnvio = new Date(sessao.codigoValidacaoEmailTime).getTime();
  const agora = new Date().getTime();

  const diferencaEmSegundos = Math.floor((agora - momentoEnvio) / 1000);

  const tempoTotal = 420; // 7 minutos

  this.tempoRestante = Math.max(tempoTotal - diferencaEmSegundos, 0);

  if (this.tempoRestante === 0) {
    this.tempoExpirado = true;
  }

  this.atualizarContador();
}

}
