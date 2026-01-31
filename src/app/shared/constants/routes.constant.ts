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
  CLIENTE: 'cliente',
  HOME: 'home',
  COMPLIANCE: 'compliance'
};

export const PATH_CLIENTE = {
  DETALHE_PAGINA: 'detalhe-pagina',
  EDITAR_PAGINA: 'editar-pagina',
  MEUS_PEDIDOS: 'meus-pedidos',
  ALTERAR_SENHA: 'alterar-senha',
  PERFIL: 'perfil',
  MINHAS_COMPRAS: 'minhas-compras'
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

export const PATH_COMPLIANCE = {
  TERMO_DE_USO: 'termo-de-uso',
  POLITICA_PRIVACIDADE: 'politica-privacidade'
};

export const PATH_ACESSO = {
  LOGIN: 'login',
  RECUPERAR_SENHA: 'recuperar-senha',
};


export const ROTAS = {
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
  },

  COMPLIANCE: {
    TERMO_DE_USO: 'compliance/termo-de-uso',
    POLITICA_PRIVACIDADE: 'compliance/politica-privacidade'
  },

  HOME: {
    TERMO_DE_USO:'termo-de-uso',
    POLITICA_PRIVACIDADE:'politica-privacidade'
  },

  CLIENTE: {
    EDITAR_PAGINA: 'auth/cliente/editar-pagina',
    PERFIL: 'auth/cliente/perfil',
    MEUS_PEDIDOS: 'auth/cliente/meus-pedidos',
    DETALHE_PAGINA: 'auth/cliente/detalhe-pagina',
    MINHAS_COMPRAS: 'auth/cliente/minhas-compras',
    ALTERAR_SENHA: 'auth/cliente/alterar-senha'
  },

  ADMIN: {
    CONFIGURACAO_SITE: 'auth/admin/configuracao-site',
    DASHBOARD: 'auth/admin/dashboard',
    PAGAMENTOS: 'auth/admin/pagamentos',
    PLANOS: 'auth/admin/planos',
    USUARIOS: 'auth/admin/usuarios'
  }
};
