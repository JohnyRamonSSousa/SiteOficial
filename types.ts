
export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
  avatar: string;
}

export enum SegmentType {
  ACADEMIA = 'Academia',
  FARMACIA = 'Farmácia',
  HAMBURGUERIA = 'Hamburgueria',
  IMOBILIARIA = 'Imobiliária',
  PETSHOP = 'Petshop',
  LEILAO = 'Leilão',
  OUTROS = 'Outros'
}

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}
