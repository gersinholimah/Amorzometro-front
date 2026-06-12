export const STORAGE = {
  DADOS_DA_SESSAO: 'dadosDaSessao',
  DADOS_MESTRE: 'dadosMestre',
};


export const PLANO = {
  GRATUITO: 'gratuito',
  BASICO: 'basico',
  INTERMEDIARO: 'intermediario',
  PREMIO: 'premio'

} as const;
export type Plano = typeof PLANO[keyof typeof PLANO];

export const TIPO_MUSICA = {
  SUGESTAO: 'sugestao',
  MANUAL: 'manual'
} as const;
export type TipoMusica = typeof TIPO_MUSICA[keyof typeof TIPO_MUSICA];
