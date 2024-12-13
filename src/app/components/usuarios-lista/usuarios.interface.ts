export interface Usuario {
  id: number;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  correo: string;
  password: string;
  foto: string;
}

export interface UsuarioInterface {
  results: Usuario[]; // Si la API devuelve una lista de usuarios
}
