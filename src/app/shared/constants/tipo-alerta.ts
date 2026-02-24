export const TIPO_ALERTA = {
  ERRO: 'error',
  AVISO: 'warning',
  SUCESSO: 'success'
}as const;

export type TipoAlerta = typeof TIPO_ALERTA[keyof typeof TIPO_ALERTA];
