import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ROTAS } from '../constants/routes.constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDadosDaSessao } from '../interfaces/estrutura.interface';
import { STORAGE } from '../constants/storage.constant';
import { TIPO_ALERTA, TipoAlerta } from '../constants/tipo-alerta';
import { ModalComponent, ModalData } from '../components/modal/modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  titulo:string = '';
  constructor(private dialog: MatDialog) {}

exibeAlertaErro(
  subtitulo: string = 'Ocorreu um erro!',
  descricao:string = "Fique tranquilo não é nada com seu dispositivo, o problema foi na nossoa plataforma") {

    const data: ModalData = {
    title: 'Ops!',
    subtitle: subtitulo,
    description: descricao,
    type: TIPO_ALERTA.ERRO,
    showOkButton: true,
    showCancelButton: false,
    showConfirmButton: false
  };
  this.dialog.open(ModalComponent, {
    width: '400px',
    data: data
  });
}


exibeAlertaAviso(
  subtitulo: string,
  descricao:string) {

    const data: ModalData = {
    title: 'Aviso!',
    subtitle: subtitulo,
    description: descricao,
    type: TIPO_ALERTA.AVISO,
    showOkButton: true,
    showCancelButton: false,
    showConfirmButton: false
  };
  this.dialog.open(ModalComponent, {
    width: '400px',
    data: data
  });
}



exibeAlertaConfirmacao(subtitulo: string, descricao:string) {
    const data: ModalData = {
    title: 'Atenção!',
    subtitle: subtitulo,
    description: descricao,
    type: TIPO_ALERTA.AVISO,
    showOkButton: false,
    showCancelButton: true,
    showConfirmButton: true
  };
  return this.dialog.open(ModalComponent, {
    width: '400px',
    data: data
  });
}













exibeModalAlerta(
  statusHttp: number,
  tipoAlerta:TipoAlerta,
  codigoErro: number = 0,
  subtitulo?: string,//'Ocorreu um erro inesperado'
  descricao?: string,
  exibeBotaoOk: boolean = true,
  exibeBotaoCancelar: boolean = false,
  exibeBotaoConfirmar: boolean = false) {

 const descricaoErro500:string = "Fique tranquilo não é nada com seu dispositivo o problema foi no nosso servidor"
if (tipoAlerta === TIPO_ALERTA.ERRO) this.titulo = 'Ops!';
if (tipoAlerta === TIPO_ALERTA.AVISO) this.titulo = 'Atenção!';
if (tipoAlerta === TIPO_ALERTA.SUCESSO) this.titulo = 'Sucesso!';

    const data: ModalData = {
    title: this.titulo,
    subtitle: subtitulo,
    description: codigoErro === 0 || statusHttp === 500 ? descricaoErro500 : descricao,
    type: tipoAlerta,
    showOkButton: exibeBotaoOk,
    showCancelButton: exibeBotaoCancelar,
    showConfirmButton: exibeBotaoConfirmar
  };
  this.dialog.open(ModalComponent, {
    width: '400px',
    data: data
  });
}









}
