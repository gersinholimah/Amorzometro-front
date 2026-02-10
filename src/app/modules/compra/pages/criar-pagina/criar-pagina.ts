
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GlobalService } from '../../../../shared/service/global.service';

import { youtubeUrlValidator } from '../../../../shared/validators/youtube-url.validator';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { ListaVideoYoutubeComponent } from '../../../../shared/components/lista-video-youtube/lista-video-youtube';
import { IYoutubeSugestao } from '../../../../shared/interfaces/estrutura.interface';
import { YoutubeService } from '../../@suport/services/youtube.service';
import { SelectCodigoPaisComponent } from '../../../../shared/components/select-codigo-pais/select-codigo-pais.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


interface FotoUpload {
  file: File;
  preview: string;
  order: number;
}

@Component({
  selector: 'app-criar-pagina',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  DragDropModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  ListaVideoYoutubeComponent,
  SelectCodigoPaisComponent,
  MatSnackBarModule
],
  templateUrl: './criar-pagina.html',
  styleUrl: './criar-pagina.css',
})
export class CriarPagina {

  fotos: FotoUpload[] = [];
  esconderSenha = true;
  shakeInput = false;

  musicaPreview?: IYoutubeSugestao;
  videoManual?: IYoutubeSugestao;
  form!: FormGroup<{
    nome1: FormControl<string>;
    nome2: FormControl<string>;
    dataEspecial: FormControl<Date | null>;
    musica: FormControl<string>;
    mensagem: FormControl<string>;
    plano: FormControl<string>;
    email: FormControl<string>;
    senha: FormControl<string>;
    ddi: FormControl<string>;
    telefone: FormControl<string>;
  }>;

 musicasSugeridas: IYoutubeSugestao[] = [
    {
      videoId: 'i9UDD6zyCGs',
      titulo: 'New West – Those Eyes',
      duracao: '03:40'
    },
    {
      videoId: 'NdYWuo9OFAw',
      titulo: 'Goo Goo Dolls – Iris',
      duracao: '03:36'
    },
    {
      videoId: '3JWTaaS7LdU',
      titulo: 'Whitney Houston – I Will Always Love You',
      duracao: '04:31'
    }
  ];
  constructor(
    private fb: FormBuilder,
    private youtubeService: YoutubeService,
    private snackBar: MatSnackBar
) {}

ngOnInit() {
  this.form = this.fb.group({
  nome1: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)]
  }),
  nome2: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)]
  }),
  dataEspecial: this.fb.control<Date | null>(null, {
    validators: Validators.required
  }),
  musica: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required, youtubeUrlValidator]
  }),
  mensagem: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)]
  }),
  plano: this.fb.control('', {
    nonNullable: true,
    validators: Validators.required
  }),

  email: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  }),

  senha: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(6)]
  }),

  ddi: this.fb.control('+55', {
    nonNullable: true,
    validators: Validators.required
  }),

  telefone: this.fb.control('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^[0-9]{8,15}$/)
    ]
  })
});


  this.form.get('musica')!.valueChanges.subscribe(url => {
  this.videoManual = undefined;

  if (!url) {
    this.musicaPreview = undefined;
    return;
  }

  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\&\?\/]+)/
  );

  if (!match) {
    this.musicaPreview = undefined;
    return;
  }

  const videoId = match[1];

  this.youtubeService.getVideoInfo(videoId)
    .subscribe(video => {
      this.musicaPreview = video ?? undefined;
    });
});


}

  get f() {
    return this.form.controls;
  }


hasError(controlName: keyof typeof this.form.controls, error: string) {
  const control = this.form.get(controlName);
  return !!(control && control.touched && control.errors?.[error]);
}

ngOnDestroy() {
  this.fotos.forEach(f => URL.revokeObjectURL(f.preview));
}
  onSelecionarFotos(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  Array.from(input.files).forEach(file => {
    this.fotos.push({
      file,
      preview: URL.createObjectURL(file), // 🚀 instantâneo
      order: this.fotos.length
    });
  });

  input.value = '';
}

  drop(event: CdkDragDrop<FotoUpload[]>) {
    moveItemInArray(this.fotos, event.previousIndex, event.currentIndex);
    this.atualizarOrdem();
  }


  removerFoto(index: number) {
  URL.revokeObjectURL(this.fotos[index].preview);
  this.fotos.splice(index, 1);
  this.atualizarOrdem();
}
  private atualizarOrdem() {
    this.fotos.forEach((f, i) => f.order = i);
  }

montarFormData(): FormData {
  const formData = new FormData();

  this.fotos
    .sort((a, b) => a.order - b.order)
    .forEach((foto) => {
      formData.append('Fotos', foto.file);
    });

  return formData;
}


  submit() {
    if (this.form.invalid || this.fotos.length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.montarFormData();

    Object.entries(this.form.value).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as any);
      }
    });

    // this.http.post('/api/rascunho', formData).subscribe();
  }

onMusicaInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.form.get('musica')?.setValue(value);
}

confirmarLinkExterno() {
  const musicaControl = this.form.get('musica');
  if (!musicaControl?.value) {
      this.snackBar.open('Informe o link do YouTube para continuar', 'OK', { duration: 3000 });
      this.shakeInput = true;
      setTimeout(() => this.shakeInput = false, 300);
      return;
  }

  if (this.musicaPreview) {
      this.videoManual = this.musicaPreview;
      this.musicaPreview = undefined;
  }
}

}
