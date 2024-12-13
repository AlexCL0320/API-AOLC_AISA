import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComidaResponse } from '../components/comidas-lista/comidas.interface';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  private apiUrl = 'http://127.0.0.1:8000/api/comidas'; // URL de la API de comidas

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de comidas
  getComidas(): Observable<ComidaResponse> {
    return this.http.get<ComidaResponse>(this.apiUrl);
  }

  // Método para obtener una comida por ID
  getComidaById(id: number): Observable<ComidaResponse> {
    return this.http.get<ComidaResponse>(`${this.apiUrl}/${id}`);
  }

  // Método para crear una nueva comida
  createComida(comida: any): Observable<ComidaResponse> {
    return this.http.post<ComidaResponse>(this.apiUrl, comida);
  }

  // Método para actualizar una comida
  updateComida(id: number, comida: any): Observable<ComidaResponse> {
    return this.http.put<ComidaResponse>(`${this.apiUrl}/${id}`, comida);
  }

  // Método para eliminar una comida
  deleteComida(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
