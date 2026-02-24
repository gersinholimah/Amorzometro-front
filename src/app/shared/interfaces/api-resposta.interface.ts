export interface IErroGenerico extends IApiErro<string[]> {}

export interface IApiErro<TItem> {
  code: number;
  message: string;
  data: TItem;
  traceId?: string;
  timestamp?: string;
}
export interface IPaginationApiResposta {
  totalItems: number;
  total: number;
  actual: number;
  offset: number;
}
