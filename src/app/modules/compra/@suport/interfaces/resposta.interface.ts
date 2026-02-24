import { IApiErro } from '../../../../shared/interfaces/api-resposta.interface';

// export interface IGenericoErro extends IApiErro<string[]> {}


export interface IRegistraUsuarioResposta{
  nome: string,
  email: string,
  tokenJwt: string,
  role: number
}

