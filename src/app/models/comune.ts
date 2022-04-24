import { Provincie } from "./provincie";

export interface Comune {
  id: number;
  nome: string;
  provincia: Provincie;
}

