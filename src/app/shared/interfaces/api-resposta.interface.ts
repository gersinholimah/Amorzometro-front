export interface IApiResposta<TItem> {
  items: TItem[];
  isOk: boolean;
  messages: IMessageApiResposta[];
  // pages: IPaginationApiResposta[];
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
