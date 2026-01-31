import { Role } from '../constants/routes.constant';

export interface IDadosDaSessao {
  milissegundos: string;
  segundos: string;
  minutos: string;
  hora: string;
  data: string;
  ano: string;
  mes: string;
  dia: string;
  role: Role;
  nome: string;
  matricula: string;
  token: string;
  cpf: string;
  ultimaInteracao: string;
}
