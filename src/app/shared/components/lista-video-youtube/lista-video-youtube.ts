import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  forwardRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export interface IYoutubeSugestao {
  videoId: string;
  titulo: string;
  duracao: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

@Component({
  selector: 'app-lista-video-youtube',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
    encapsulation: ViewEncapsulation.None,
  templateUrl: './lista-video-youtube.html',
  styleUrl: './lista-video-youtube.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListaVideoYoutubeComponent),
      multi: true
    }
  ]
})
export class ListaVideoYoutubeComponent
  implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() sugestoes: IYoutubeSugestao[] = [];

  selecionado?: string;
  tocando?: string;
  player?: any;
  ytReady = false;
  confirmado?: string;


  // ===== ControlValueAccessor =====
  onChange = (_: string | null) => {};
  onTouched = () => {};

  writeValue(value: string | null): void {
    if (!value) {
      this.selecionado = undefined;
      return;
    }

    const match = value.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/
    );

    this.selecionado = match ? match[1] : undefined;

    if (this.sugestoes.length === 1) {
  this.confirmado = this.sugestoes[0].videoId;
}

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ===== Lifecycle =====
  ngOnInit(): void {
    if (window.YT?.Player) {
      this.ytReady = true;
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      this.ytReady = true;
    };
  }

  ngOnDestroy(): void {
    this.player?.destroy();
  }

  // ===== Actions =====
  play(videoId: string): void {
    if (!this.ytReady) return;

    this.tocando = videoId;
    this.selecionado = videoId;

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    this.onChange(url);
    this.onTouched();

    if (!this.player) {
      this.player = new window.YT.Player('yt-player', {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1
        }
      });
    } else {
      this.player.loadVideoById(videoId);
    }
  }

  onItemClick(videoId: string): void {
  // sempre seleciona
  this.selecionado = videoId;

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  this.onChange(url);
  this.onTouched();
}

togglePlay(videoId: string): void {
  if (!this.ytReady) return;

  // se clicar no mesmo vídeo → pausa
  if (this.tocando === videoId) {
    this.player?.pauseVideo();
    this.tocando = undefined;
    return;
  }

  // novo vídeo → seleciona + toca
  this.selecionado = videoId;

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  this.onChange(url);
  this.onTouched();

  this.tocando = videoId;

  if (!this.player) {
    this.player = new YT.Player('yt-player', {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1
      }
    });
  } else {
    this.player.loadVideoById(videoId);
  }
}

confirmar(videoId: string): void {
  // 🔥 SE JÁ ESTÁ CONFIRMADO → REMOVE
  if (this.confirmado === videoId) {
    this.confirmado = undefined;
    this.selecionado = undefined;
    this.tocando = undefined;

    this.player?.stopVideo();

    // limpa o formControl
    this.onChange(null);
    this.onTouched();
    return;
  }

  // ✅ fluxo normal de confirmação
  this.confirmado = videoId;
  this.selecionado = videoId;

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  this.onChange(url);
  this.onTouched();
}

/*
confirmar(videoId: string): void {
  // se clicar no mesmo → desfaz confirmação
  if (this.confirmado === videoId) {
    this.confirmado = undefined;
    return;
  }

  // confirma este e esconde os outros
  this.confirmado = videoId;
  this.selecionado = videoId;

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  this.onChange(url);
  this.onTouched();
}
*/
}
