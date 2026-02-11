import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatIconModule,
    MatProgressSpinnerModule
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
  implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {

  @Input() sugestoes: IYoutubeSugestao[] = [];

  selecionado?: string;
  tocando?: string;
  player?: any;
  ytReady = false;
  confirmado?: string;

  // Loading Flags
  thumbLoadingMap: Record<string, boolean> = {};
  playerLoading = false;


  constructor(private cdr: ChangeDetectorRef) {}

  // ===== ControlValueAccessor =====
  onChange = (_: string | null) => {};
  onTouched = () => {};

  writeValue(value: string | null): void {
    if (!value) {
      this.selecionado = undefined;
      this.confirmado = undefined;
      return;
    }

    const match = value.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/
    );

    const videoId = match ? match[1] : undefined;
    this.selecionado = videoId;

    if (videoId) {
      const found = this.sugestoes.find(s => s.videoId === videoId);
      if (found) {
        this.confirmado = videoId;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ===== Lifecycle =====
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sugestoes']) {
      // Inicializa loading dos thumbs
      if (this.sugestoes) {
        this.sugestoes.forEach(s => {
          this.thumbLoadingMap[s.videoId] = true;
        });
      }

      // Se houver apenas uma sugestão (caso do videoManual), confirmamos automaticamente
      if (this.sugestoes.length === 1) {
        const videoId = this.sugestoes[0].videoId;
        this.confirmado = videoId;
        this.selecionado = videoId;
      }

      // Verifica se o selecionado ainda está na lista (para outros casos)
      if (this.selecionado) {
        const found = this.sugestoes.find(s => s.videoId === this.selecionado);
        if (found) {
          this.confirmado = this.selecionado;
        }
      }
    }
  }

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
      this.cdr.detectChanges();
    };
  }

  ngOnDestroy(): void {
    this.player?.destroy();
  }

  onThumbLoad(videoId: string): void {
    this.thumbLoadingMap[videoId] = false;
  }

  // ===== Actions =====
  play(videoId: string): void {
    if (!this.ytReady) return;

    this.tocando = videoId;
    this.selecionado = videoId;
    this.playerLoading = true;

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
        },
        events: {
          'onStateChange': (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              this.playerLoading = false;
              this.cdr.detectChanges();
            }
          }
        }
      });
    } else {
      this.player.loadVideoById(videoId);
    }
  }

  onItemClick(videoId: string): void {
  // sempre seleciona
  this.selecionado = videoId;
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
  this.tocando = videoId;
  this.playerLoading = true;

  if (!this.player) {
    this.player = new window.YT.Player('yt-player', {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1
      },
      events: {
        'onStateChange': (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            this.playerLoading = false;
            this.cdr.detectChanges();
          }
        }
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
  this.player?.stopVideo();
  this.tocando = undefined; // <--- Icon resets to play
  this.confirmado = videoId;
  this.selecionado = videoId;

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  this.onChange(url);
  this.onTouched();
}
}
