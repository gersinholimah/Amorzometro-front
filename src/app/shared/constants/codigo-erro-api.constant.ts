export const CODIGO_ERRO_API = {
  Usuario: {
    EmailJaCadastrado: 1,
    EmailNaoValidado: 2,
    TokenInvalidoNoRegistro: 3,
    CredenciaisInvalidas: 4,
    UsuarioNaoEncontrado: 5,
    ContaDesativada: 6,
    TokenInvalidoOuExpirado: 7,
  },

  Pagamento: {
    UsuarioNaoEncontrado: 51,
    PedidoNaoEncontrado: 52,
    StatusPedidoInvalidoParaPagamento: 53,
    ErroCriacaoPix: 54,
    ErroGeracaoQrCode: 55,
    PagamentoJaRealizado: 56,
    ErroBuscaQrCode: 57,
    ErroConsultaStatus: 58,
    RespostaInvalidaGateway: 59,
  },

  Pedido: {
    SemPermissao: 101,
    SemPermissaoPlano: 102,
    PedidoPendenteExistente: 103,
    PedidoNaoEncontrado: 104,
    AlteracaoPlanoNaoPermitidaAposPagamento: 105,
    NenhumaAlteracaoPlano: 106,
    PlanoInvalido: 107,
    StatusPedidoInvalidoParaAlteracao: 108,
  },

  Pagina: {
    SemPermissao: 151,
    RascunhoNaoEncontrado: 152,
    PaginaNaoEncontrada: 153,
    PaginaNaoEncontradaPorId: 154,
  },

  Rascunho: {
    SemPermissao: 201,
    DadosDivergentes: 202,
    PedidoCancelado: 203,
    ContaDesativada: 204,
    VideoUrlInvalida: 205,
    RascunhoNaoEncontrado: 206,
  },

  Helpers: {
    ErroValidacao: 251,
  },
   Autenticacao: {
    UltimoTokenAindaValido: 301,
  }

} as const;
