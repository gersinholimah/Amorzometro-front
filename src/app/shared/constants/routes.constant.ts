export const ROLES = {
  ADMIN: 'ADMIN',
  CLIENTE: 'CLIENTE'
} as const;
export type Role = typeof ROLES[keyof typeof ROLES];

export const STATUS = {
  AUTENTICADO: 'auth',
  NAO_AUTENTICADO: 'nao-autenticado'
};

export const PATH_MODULO = {
  ACESSO: 'acesso',
  COMPRA: 'compra',
  ADMIN: 'admin',
  CLIENTE: 'cliente'
};

export const PATH_CLIENTE = {
  DETALHE_PAGINA: 'detalhe-pagina',
  EDITAR_PAGINA: 'editar-pagina',
  MEUS_PEDIDOS: 'meus-pedidos',
  ALTERAR_SENHA: 'alterar-senha',
  PERFIL: 'perfil'
};

export const PATH_ADMIN = {
  CONFIGURACAO_SITE: 'configuracao-site',
  DASHBOARD: 'dashboard',
  PAGAMENTOS: 'pagamentos',
  PLANOS: 'planos',
  USUARIOS: 'usuarios'
};

export const PATH_COMPRA = {
  CRIAR_PAGINA: 'criar-pagina',
  PAGAMENTO: 'pagamento'
};


export const PATH_ACESSO = {
  LOGIN: 'login',
  RECUPERAR_SENHA: 'recuperar-senha',
};




export const ROTAS = {
  HOME: 'auth/home',
  ERROR_400: 'error-400',
  ERROR_500: 'error-500',

  ACESSO: {
    LOGIN:'login',
    RECUPERAR_SENHA:'recuperar-senha',
    NOVA_SENHA:'nova-senha'
  },

  COMPRA: {
    CRIAR_PAGINA:'criar-pagina',
    PAGAMENTO:'pagamento',
    TERMO_DE_USO:'termo-de-uso',
    POLITICA_PRIVACIDADE:'politica-privacidade'
  },

  CLINTE: {
    EDITAR: 'auth/cliente/editar',
    PERFIL: 'auth/cliente/perfil',
    HISTORICO_PAGAMENTO: 'auth/cliente/historico-pagamento',
    PAGINA_DETALHE: 'auth/cliente/pagina-detalhe',
    PAGINAS: 'auth/cliente/paginas'
  },

  ADMIN: {
    CONFIGURACAO_SITE: 'auth/admin/configuracao-site',
    DASHBOARD: 'auth/admin/dashboard',
    PAGAMENTOS: 'auth/admin/pagamentos',
    PLANOS: 'auth/admin/planos',
    USUARIOS: 'auth/admin/usuarios'
  }
};
