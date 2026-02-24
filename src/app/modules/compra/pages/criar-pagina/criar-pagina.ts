import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { GlobalService } from "../../../../shared/service/global.service";
import { LocalStorageService } from "../../../../shared/service/local-storage.service";

import { youtubeUrlValidator } from "../../../../shared/validators/youtube-url.validator";

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormsModule,
} from "@angular/forms";

import { ListaVideoYoutubeComponent } from "../../../../shared/components/lista-video-youtube/lista-video-youtube";
import {
  IYoutubeSugestao,
  CriarPaginaStorage,
  DadosStorage,
  MusicaStorage,
  IDadosDaSessao,
} from "../../../../shared/interfaces/estrutura.interface";
import { YoutubeService } from "../../@suport/services/youtube.service";
import { SelectCodigoPaisComponent } from "../../../../shared/components/select-codigo-pais/select-codigo-pais.component";
import { IndexedDbStorageService } from "../../../../shared/service/indexed-db-storage.service";
import {
  STORAGE,
  TIPO_MUSICA,
} from "../../../../shared/constants/storage.constant";
import { debounceTime } from "rxjs/operators";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { ConfirmarCodigoComponent } from "../../../../shared/components/confirmar-codigo/confirmar-codigo.component";

import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { NgxMaskDirective } from "ngx-mask";
import { ApiService } from "../../@suport/apis/api.service";
// import { IAutenticaEmailResposta, IAutenticaEmailErro, IGenericoErro } from '../../@suport/interfaces/resposta.interface';
import {
  IAutenticarEmailRequisicao,
  IRegistrarUsuarioRequisicao,
} from "../../@suport/interfaces/requisicao.interface";
import {
  ModalComponent,
  ModalData,
} from "../../../../shared/components/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { IRegistraUsuarioResposta } from "../../@suport/interfaces/resposta.interface";
import { IErroGenerico } from "./../../../../shared/interfaces/api-resposta.interface";
import {
  TIPO_ALERTA,
  TipoAlerta,
} from "../../../../shared/constants/tipo-alerta";
import { CODIGO_ERRO_API } from "../../../../shared/constants/codigo-erro-api.constant";
import {
  PATH_MODULO,
  PATH_ACESSO,
} from "../../../../shared/constants/routes.constant";

import { Router } from "@angular/router";
import { MODAL_RESPOSTA } from "../../../../shared/constants/respostas-modal-constant";

interface FotoUpload {
  file: File;
  preview: string;
  order: number;
}

@Component({
  selector: "app-criar-pagina",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatSnackBarModule,
    MatButtonToggleModule,
    NgxMaskDirective,
    MatDialogModule,
  ],
  templateUrl: "./criar-pagina.html",
  styleUrl: "./criar-pagina.css",
})
export class CriarPagina implements AfterViewInit {
  @ViewChild("scrollContainer") scrollContainer!: ElementRef<HTMLElement>;
  statusHttp: number = 0;
  showScrollButtons = false;
  tipoAlerta: string = "";

  fotos: FotoUpload[] = [];
  esconderSenha = true;
  shakeInput = false;
  draftCriadoEm: string | null = null;
  emailJaCadastradoErro: boolean = false;
  musicaSelecionada: string | null = null;
  musicaPreview?: IYoutubeSugestao;
  videoManual?: IYoutubeSugestao;
  datePickerControl = new FormControl<Date | null>(null);
  telefoneMask = "(00) 0000-0000||(00) 00000-0000";
  mensagemErro: string = "";
  mensagemEmailErro: string = "";
  form!: FormGroup<{
    nome1: FormControl<string>;
    nome2: FormControl<string>;
    dataEspecial: FormControl<string | null>;
    musica: FormControl<string>;
    mensagem: FormControl<string>;
    plano: FormControl<"eterno" | "anual" | "mensal" | "">; // ✅ corrigido
    // plano: ['mensal', Validators.required]

    email: FormControl<string>;
    senha: FormControl<string>;
    ddi: FormControl<string>;
    telefone: FormControl<string>;
  }>;

  erroGenericoApiBusiness: IErroGenerico | null = null;
  musicasSugeridas: IYoutubeSugestao[] = [
    {
      videoId: "i9UDD6zyCGs",
      titulo: "New West – Those Eyes",
      duracao: "03:40",
    },
    {
      videoId: "NdYWuo9OFAw",
      titulo: "Goo Goo Dolls – Iris",
      duracao: "03:36",
    },
    {
      videoId: "3JWTaaS7LdU",
      titulo: "Whitney Houston – I Will Always Love You",
      duracao: "04:31",
    },
  ];

  planos = [
    {
      id: "mensal",
      nome: "Mensal",
      preco: 9.9,
      precoAntigo: null,
      destaque: false,
      descricao: "Pagamento mensal recorrente",
    },
    {
      id: "anual",
      nome: "Anual",
      preco: 59.9,
      precoAntigo: 99.9,
      destaque: true,
      descricao: "Economize 40% no plano anual",
    },
    {
      id: "eterno",
      nome: "Para Sempre",
      preco: 19.9,
      precoAntigo: 39.9,
      destaque: false,
      descricao: "Pagamento único vitalício",
    },
  ];

  // respostaAutenticaEmail: IAutenticaEmailResposta | null = null;
  retornoRegistraUsuario!: IRegistraUsuarioResposta;
  @ViewChild("cardVamosComecar", { read: ElementRef })
  cardVamosComecar!: ElementRef;
  @ViewChild("cardNossoDia", { read: ElementRef }) cardNossoDia!: ElementRef;
  @ViewChild("cardMomentos", { read: ElementRef }) cardMomentos!: ElementRef;
  @ViewChild("cardMusica", { read: ElementRef }) cardMusica!: ElementRef;
  @ViewChild("cardMensagem", { read: ElementRef }) cardMensagem!: ElementRef;
  @ViewChild("cardPlano", { read: ElementRef }) cardPlano!: ElementRef;
  @ViewChild("cardContato", { read: ElementRef }) cardContato!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private youtubeService: YoutubeService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private indexedDbStorageService: IndexedDbStorageService,
    public dialog: MatDialog,
    private apiService: ApiService,
    private globalService: GlobalService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      nome1: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      nome2: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      dataEspecial: this.fb.control<string | null>(null, {
        validators: Validators.required,
      }),
      musica: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required, youtubeUrlValidator],
      }),
      mensagem: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(10)],
      }),
      plano: this.fb.control<"eterno" | "anual" | "mensal" | "">("", {
        nonNullable: true,
        validators: Validators.required,
      }),

      email: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),

      senha: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),

      ddi: this.fb.control("+55", {
        nonNullable: true,
        validators: Validators.required,
      }),

      telefone: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)],
      }),
    });
    this.limpaErroEmailJaCadastrado();
    this.form.get("musica")!.valueChanges.subscribe((url) => {
      if (!url) {
        this.musicaPreview = undefined;
        if (!this.musicaSelecionada) {
          this.videoManual = undefined;
        }
        return;
      }

      const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\&\?\/]+)/,
      );

      if (!match) {
        this.musicaPreview = undefined;
        if (!this.musicaSelecionada) {
          this.videoManual = undefined;
        }
        return;
      }

      const videoId = match[1];

      // Se já temos um videoManual e o ID é o mesmo, não faz nada
      if (this.videoManual && this.videoManual.videoId === videoId) {
        return;
      }

      // Se o ID mudou, resetamos o manual
      this.videoManual = undefined;

      this.youtubeService.getVideoInfo(videoId).subscribe((video) => {
        this.musicaPreview = video ?? undefined;
      });
    });

    // Sync Logic for Data Especial
    this.form.get("dataEspecial")?.valueChanges.subscribe((val) => {
      if (val && val.length === 8) {
        const day = +val.substring(0, 2);
        const month = +val.substring(2, 4);
        const year = +val.substring(4, 8);
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          const current = this.datePickerControl.value;
          if (!current || current.getTime() !== date.getTime()) {
            this.datePickerControl.setValue(date, { emitEvent: false });
          }
        }
      } else if (!val) {
        this.datePickerControl.setValue(null, { emitEvent: false });
      }
    });

    this.form.get("ddi")?.valueChanges.subscribe((ddi) => {
      if (ddi === "+55") {
        this.telefoneMask = "(00) 0000-0000||(00) 00000-0000";
        this.form
          .get("telefone")
          ?.setValidators([
            Validators.required,
            Validators.pattern(/^[0-9]{10,11}$/),
          ]);
      } else {
        this.telefoneMask = "0*";
        this.form
          .get("telefone")
          ?.setValidators([
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
          ]);
      }
      this.form.get("telefone")?.updateValueAndValidity();
    });

    this.datePickerControl.valueChanges.subscribe((date) => {
      if (date) {
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = date.getFullYear();
        const str = `${d}${m}${y}`;
        this.form.get("dataEspecial")?.setValue(str, { emitEvent: false });
      }
    });

    const draft = await this.indexedDbStorageService.get("draft");
    if (draft) {
      this.draftCriadoEm = draft.criadoEm;

      const { dataEspecial, ...rest } = draft.dados;
      let dateStr = null;

      if (dataEspecial) {
        const d = new Date(dataEspecial);
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const year = d.getFullYear();
        dateStr = `${day}${month}${year}`;
        this.datePickerControl.setValue(d, { emitEvent: false });
      }

      this.form.patchValue({
        ...rest,
        dataEspecial: dateStr,
      });

      if (draft.fotos?.length) {
        this.fotos = draft.fotos
          .sort((a, b) => a.order - b.order)
          .map((f) => ({
            file: f.file,
            preview: URL.createObjectURL(f.file),
            order: f.order,
          }));
        setTimeout(() => {
          this.checkOverflow();
          this.cdr.detectChanges();
        });
      }

      if (draft.musica) {
        if (draft.musica.tipo === TIPO_MUSICA.MANUAL) {
          this.videoManual = {
            videoId: draft.musica.videoId,
            titulo: draft.musica.titulo,
            duracao: "",
          };
          this.musicaSelecionada = `https://www.youtube.com/watch?v=${draft.musica.videoId}`;
        } else {
          this.musicaSelecionada = draft.musica.url;
        }
        this.form.get("musica")?.setValue("", { emitEvent: false });
      }
    }

    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.salvarDraft());
  }

  get f() {
    return this.form.controls;
  }

  hasError(controlName: keyof typeof this.form.controls, error: string) {
    const control = this.form.get(controlName);
    return !!(control && control.touched && control.errors?.[error]);
  }

  ngOnDestroy() {
    this.fotos.forEach((f) => URL.revokeObjectURL(f.preview));
  }
  onSelecionarFotos(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const remaining = 9 - this.fotos.length;
    if (remaining <= 0) return;

    Array.from(input.files)
      .slice(0, remaining)
      .forEach((file) => {
        this.fotos.push({
          file,
          preview: URL.createObjectURL(file), // 🚀 instantâneo
          order: this.fotos.length,
        });
      });

    input.value = "";
    setTimeout(() => {
      this.checkOverflow();
      this.cdr.detectChanges();
      this.salvarDraft();
    }, 500);
  }

  drop(event: CdkDragDrop<FotoUpload[]>) {
    moveItemInArray(this.fotos, event.previousIndex, event.currentIndex);
    this.atualizarOrdem();
    this.salvarDraft();
  }

  removerFoto(index: number) {
    URL.revokeObjectURL(this.fotos[index].preview);
    this.fotos.splice(index, 1);
    this.atualizarOrdem();
    setTimeout(() => {
      this.checkOverflow();
      this.cdr.detectChanges();
      this.salvarDraft();
    }, 500);
  }
  private atualizarOrdem() {
    this.fotos.forEach((f, i) => (f.order = i));
  }

  ngAfterViewInit() {
    this.checkOverflow();
    this.cdr.detectChanges();
  }

  @HostListener("window:resize")
  onResize() {
    this.checkOverflow();
  }

  checkOverflow() {
    if (this.scrollContainer?.nativeElement) {
      const el = this.scrollContainer.nativeElement;
      this.showScrollButtons = el.scrollWidth > el.clientWidth;
    }
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  }

  montarFormData(): FormData {
    const formData = new FormData();

    this.fotos
      .sort((a, b) => a.order - b.order)
      .forEach((foto) => {
        formData.append("Fotos", foto.file);
      });

    return formData;
  }

  async submit() {
    this.limpaErroEmailJaCadastrado();

    console.log("Form válido?", this.form.valid);
    console.log("Fotos:", this.fotos.length);
    this.form.markAllAsTouched();
    const musicaValida = this.f.musica.valid || this.musicaSelecionada;

    if (
      this.fotos.length === 0 ||
      this.f.nome1.invalid ||
      this.f.nome2.invalid ||
      this.f.dataEspecial.invalid ||
      !musicaValida ||
      this.f.mensagem.invalid ||
      this.f.plano.invalid ||
      this.f.email.invalid ||
      this.f.telefone.invalid ||
      this.f.senha.invalid
    ) {
      // if (this.form.invalid || this.fotos.length === 0) {

      // ORDEM IMPORTA — top to bottom

      if (this.f.nome1.invalid || this.f.nome2.invalid) {
        this.scrollToCard(this.cardVamosComecar);
        return;
      }

      if (this.f.dataEspecial.invalid) {
        this.scrollToCard(this.cardNossoDia);
        return;
      }

      if (this.fotos.length === 0) {
        this.scrollToCard(this.cardMomentos);
        return;
      }

      if (this.f.musica.invalid && !this.musicaSelecionada) {
        this.scrollToCard(this.cardMusica);
        return;
      }

      if (this.f.mensagem.invalid) {
        this.scrollToCard(this.cardMensagem);
        return;
      }

      if (this.f.plano.invalid) {
        this.scrollToCard(this.cardPlano);
        return;
      }

      if (
        this.f.email.invalid ||
        this.f.telefone.invalid ||
        this.f.senha.invalid
      ) {
        this.scrollToCard(this.cardContato);
        return;
      }

      return;
    }
    const email = this.f.email.value;

    try {
      const body: IAutenticarEmailRequisicao = {
        email: email,
      };
      await this.apiService.postAutenticaEmail(body);

      this.localStorageService.atualizarDadosDaSessao({
        role: undefined,
        tokenValidacao: undefined,
      });
      //  se chegou aqui está válido
      this.exibeOtaConfirmcaoCodigo();
    } catch (error: unknown) {
      const sessao = await this.obterSessao();

      this.erroGenericoApiBusiness = this.capturaErros(error);
      if (
        this.erroGenericoApiBusiness?.code ===
          CODIGO_ERRO_API.Autenticacao.UltimoTokenAindaValido &&
        sessao?.tokenValidacao
      ) {
        this.tentaRegistrarUsuarioNovamente(sessao.tokenValidacao);
      }
    }
  }
  async tentaRegistrarUsuarioNovamente(tokenInformado: string) {
    try {
      const body: IRegistrarUsuarioRequisicao = {
        nome: `${this.f.nome1.value} & ${this.f.nome2.value}`,
        email: this.f.email.value,
        senha: this.f.senha.value,
        token: Number(tokenInformado),
      };
      this.retornoRegistraUsuario =
        await this.apiService.postRegistrarUsuario(body);
    } catch (error: unknown) {
      this.erroGenericoApiBusiness = this.capturaErros(error);
      this.trataErrosDeRegistroUsuario();
    }
  }

  async exibeOtaConfirmcaoCodigo() {
    const formCodigo = this.dialog.open(ConfirmarCodigoComponent, {
      width: "400px",
      disableClose: true,
    });

    formCodigo.componentInstance.codigoConfirmado.subscribe(
      async (tokenDigitado: string) => {
        const body: IRegistrarUsuarioRequisicao = {
          nome: `${this.f.nome1.value} & ${this.f.nome2.value}`,
          email: this.f.email.value,
          senha: this.f.senha.value,
          token: Number(tokenDigitado),
        };
        try {
          this.retornoRegistraUsuario =
            await this.apiService.postRegistrarUsuario(body);
          console.log(
            "Usuário registrado com sucesso! Token JWT:",
            this.retornoRegistraUsuario,
          );
          if (this.retornoRegistraUsuario?.tokenJwt) {
            formCodigo.close(tokenDigitado);
          }
        } catch (error: unknown) {
          this.erroGenericoApiBusiness = this.capturaErros(error);
          console.log("erroGenericoApiBusiness", this.erroGenericoApiBusiness);

          this.trataErrosDeRegistroUsuario(tokenDigitado, formCodigo);
        }
      },
    ); //IErroGenerico
  }
  async trataErrosDeRegistroUsuario(
    tokenInformado?: string,
    formCodigo?: MatDialogRef<ConfirmarCodigoComponent, any>,
  ) {
    if (
      this.erroGenericoApiBusiness?.code ===
      CODIGO_ERRO_API.Usuario.EmailJaCadastrado
    ) {
      const desejaFazerLogin = this.globalService.exibeAlertaConfirmacao(
        `Você já possui uma conta com o e-mail: ${this.f.email.value}`,
        "Deseja fazer login?",
      );
      desejaFazerLogin.afterClosed().subscribe(async (resposta) => {
        if (resposta === MODAL_RESPOSTA.SIM) {
          this.router.navigate([PATH_MODULO.ACESSO, PATH_ACESSO.LOGIN]);
          console.log("disse sim");
        }
        if(resposta === MODAL_RESPOSTA.NAO) {
          console.log("disse não");

          this.f.email.setErrors({ emailJaCadastrado: true });
          this.f.email.markAsTouched();
          this.mensagemEmailErro =
            "Este e-mail já está cadastrado. Por favor, insira outro ou faça login.";
          this.emailJaCadastradoErro = true;

          if (tokenInformado) {
            this.localStorageService.atualizarDadosDaSessao({
              role: undefined,
              tokenValidacao: tokenInformado,
            });
          }
        }
      });
      console.log("formCodigo", formCodigo);
      if (formCodigo) formCodigo.close(tokenInformado);
    }
    if (
      this.erroGenericoApiBusiness?.code ===
        CODIGO_ERRO_API.Usuario.TokenInvalidoNoRegistro &&
      formCodigo
    ) {
      formCodigo.componentInstance.erro = "Código inválido";
    }
  }
  limpaErroEmailJaCadastrado() {
    const errors = this.f.email.errors;
    if (errors?.["emailJaCadastrado"]) {
      delete errors["emailJaCadastrado"];
      this.f.email.setErrors(Object.keys(errors).length ? errors : null);
      this.mensagemEmailErro = "";
    }
  }
  capturaErros(error: unknown): IErroGenerico | null {
    if (error instanceof HttpErrorResponse) {
      this.statusHttp = error.status;
      return error.error as IErroGenerico;
    }
    return null;
  }

  async salvarDraft() {
    const {
      musica: _musicaControl,
      dataEspecial,
      ...rest
    } = this.form.getRawValue();

    let dataEspecialISO: string | null = null;
    if (dataEspecial && dataEspecial.length === 8) {
      const day = +dataEspecial.substring(0, 2);
      const month = +dataEspecial.substring(2, 4);
      const year = +dataEspecial.substring(4, 8);
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        dataEspecialISO = date.toISOString();
      }
    }

    const dados: DadosStorage = {
      ...rest,
      dataEspecial: dataEspecialISO,
      plano: rest.plano as any,
    };

    let musica: MusicaStorage | undefined;

    if (this.videoManual) {
      musica = {
        tipo: TIPO_MUSICA.MANUAL,
        videoId: this.videoManual.videoId,
        titulo: this.videoManual.titulo,
      };
    } else if (this.musicaSelecionada) {
      musica = {
        tipo: TIPO_MUSICA.SUGESTAO,
        url: this.musicaSelecionada,
      };
    }

    const draft: CriarPaginaStorage = {
      id: "draft",
      criadoEm: this.draftCriadoEm || new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      dados,
      musica,
      fotos: this.fotos.map((f) => ({
        file: f.file,
        order: f.order,
      })),
    };

    if (!this.draftCriadoEm) {
      this.draftCriadoEm = draft.criadoEm;
    }

    await this.indexedDbStorageService.save(draft);
  }

  onMusicaInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.get("musica")?.setValue(value);
  }

  onVideoSelecionado(url: string | null) {
    if (url) {
      this.musicaSelecionada = url;
      this.form.get("musica")?.setValue("");
    } else {
      this.musicaSelecionada = null;
      this.videoManual = undefined;
      // se desejar limpar o input, descomente abaixo
      // this.form.get('musica')?.setValue('');
    }
    this.salvarDraft();
  }

  confirmarLinkExterno() {
    const musicaControl = this.form.get("musica");
    if (!musicaControl?.value) {
      this.snackBar.open("Informe o link do YouTube para continuar", "OK", {
        duration: 3000,
      });
      this.shakeInput = true;
      setTimeout(() => (this.shakeInput = false), 300);
      return;
    }

    if (this.musicaPreview) {
      this.videoManual = this.musicaPreview;
      // confirma usando URL do youtube
      const url = `https://www.youtube.com/watch?v=${this.musicaPreview.videoId}`;
      this.onVideoSelecionado(url);
      this.musicaPreview = undefined;
    }
  }

  private scrollToCard(card: ElementRef) {
    setTimeout(() => {
      const element = card.nativeElement as HTMLElement;

      const headerHeight = 100; // se tiver
      const y =
        element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      element.classList.add("shake");

      setTimeout(() => {
        element.classList.remove("shake");
      }, 400);
    });
  }

  private async obterSessao(): Promise<IDadosDaSessao | null> {
    return this.localStorageService.getDadosDaSessao();
  }
}
