import { CODIGO_ERRO_API } from "./codigo-erro-api.constant";

export const ERROS_TRATADOS_LOCALMENTE: number[] = [
  CODIGO_ERRO_API.Usuario.EmailJaCadastrado,
  CODIGO_ERRO_API.Autenticacao.UltimoTokenAindaValido,
];

//Helpers.ErroValidacao
