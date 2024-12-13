export interface Comida {
  id: number;
  nombre: string;
  ingredientes: string;
  categoria: string;
  precio: string;
  detalles: string;
  created_at?: string;
  updated_at?: string;
}

export interface ComidaResponse {
  data: Comida[];
}