export interface Pokemon {
    id: number;
    nombre: string;
    habilidades: string;
    tipo: string;
    url: string;
    imagen?: string; // Opcional porque puede que no exista inicialmente
  }
  
  export interface PokemonApiResponse {
    results: {
      name: string;
      url: string;
    }[];
  }
  