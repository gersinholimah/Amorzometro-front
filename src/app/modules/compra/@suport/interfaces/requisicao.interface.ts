export interface IAutenticarEmailRequisicao {
  email: string;
}

export interface IRegistrarUsuarioRequisicao {
  nome: string,
  email: string,
  senha: string,
  token: number
}


export interface ICriarRascunhoRequsicao{
 videoUrl:string | null;
 primeiroNomeCasal:string;
 segundoNomeCasal:string;
 dataInicioRelacionamento: Date;
 texto: string;
 plano:number;
 idPedido: number;
 fotos: FotosStorage[];
}
export interface FotosStorage {
  file: File;
  order: number;
}
