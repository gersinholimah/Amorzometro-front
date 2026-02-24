import { Role } from '../constants/routes.constant';
import { Plano, TIPO_MUSICA,  } from '../constants/storage.constant';

export interface IDadosDaSessao {
  milissegundos?: string;
  segundos?: string;
  minutos?: string;
  hora?: string;
  data?: string;
  ano?: string;
  mes?: string;
  dia?: string;
  role: string; //Role;
  nome?: string;
  matricula?: string;
  tokenAutenticacao?: string;
  tokenValidacao?: string;
  cpf?: string;
  ultimaInteracao?: string;
}


export interface IYoutubeSugestao {
  videoId: string;
  titulo: string;
  duracao: string;
}

export interface PaisDDI {
  nome: string;
  codigo: string;
  bandeira: string;
}



export interface CriarPaginaStorage {
  id: string;
  criadoEm: string;
  atualizadoEm: string;
  dados: DadosStorage;
  musica?: MusicaStorage;
  fotos: FotosStorage[];
}

export interface FotosStorage {
  file: File;
  order: number;
}

export type MusicaStorage =  | {
  tipo: typeof TIPO_MUSICA.SUGESTAO;
  url: string;
    } | {
      tipo: typeof TIPO_MUSICA.MANUAL;
      videoId: string;
      titulo: string;
    };

export interface DadosStorage {
  nome1: string;
  nome2: string;
  dataEspecial: string | null;
  mensagem: string;
  plano: Plano;
  email: string;
  senha: string;
  ddi: string;
  telefone: string;
}

