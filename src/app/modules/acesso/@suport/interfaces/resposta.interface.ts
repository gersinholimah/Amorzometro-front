import { IApiResposta } from '../../../../shared/interfaces/api-resposta.interface';

export interface ILoginResposta extends IApiResposta<IItensLoginResposta> {}

export interface IItensLoginResposta {
  Nome: string;
  Email: string;
  TokenJwt: string;
  Role: string;
}
