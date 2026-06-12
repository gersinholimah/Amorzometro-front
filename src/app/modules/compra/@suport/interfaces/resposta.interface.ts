import { IApiErro } from '../../../../shared/interfaces/api-resposta.interface';

// export interface IGenericoErro extends IApiErro<string[]> {}


export interface IRegistraUsuarioResposta{
  nome: string,
  email: string,
  tokenJwt: string,
  role: number
}

export interface ICriarPedidoResposta{
id:number;
valor:number;
plano:number;
}


export interface ICriarRascunhoResposta{

   fotoUrl: string
   paginaUrl: string
   idVideoYoutube: string
  primeiroNomeCasal: string
  segundoNomeCasal: string
  dataInicioRelacionamento: Date
  texto: string
    dataCriacao: Date
  plano: number
  ativo: boolean
 }
