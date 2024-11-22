import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalUserService {
  userImageUrl: string = ''; // Variable para la URL de la imagen del usuario
  userName: string = ''; // Variable para la nombre del usuario

  constructor() {}

  // Método para establecer la URL de la imagen
  setUserImageUrl(url: string) {
    this.userImageUrl = url;
  }

  // Método para obtener la URL de la imagen
  getUserImageUrl(): string {
    return this.userImageUrl;
  }
  // Método para establecer  el nombre del usuario
  setUserName(name: string) {
    this.userName = name;
  }

  // Método para obtener la URL de la imagen
  getUserName(): string {
    return this.userName;
  }
  
  
}
