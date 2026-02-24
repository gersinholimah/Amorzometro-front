export interface IAutenticarEmailRequisicao {
  email: string;
}

export interface IRegistrarUsuarioRequisicao {
  nome: string,
  email: string,
  senha: string,
  token: number
}
