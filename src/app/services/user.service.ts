import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Cambia esto a tu URL de API

  constructor(private http: HttpClient) {}

  // Eliminar usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  // Editar usuario
  editUser(id: number, user: any): Observable<any> {
    console.log('Datos enviados:', user);
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, user);
  }

  // Obtener usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }
}
