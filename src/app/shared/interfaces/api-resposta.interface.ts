 export interface IApiErro<TItem> {
  code: number;
  message: string;
  dados: TItem[];
  traceId?: string;
  timestamp?: string;
}

export interface IMessageApiResposta {
  messageId: string;
  objectId: string;
  type: number;
  message: string;
  messageUs: string;
  lastUpdate: string;
  showBadge: boolean;
}
export interface IPaginationApiResposta {
  totalItems: number;
  total: number;
  actual: number;
  offset: number;
}
