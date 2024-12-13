import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Asegúrate de importar el servicio correctamente
import { GlobalUserService } from '../services/global-user.service';  // Asegúrate de importar el servicio correctamente
import { FooterComponent } from "../footer/footer.component";  // Si usas este componente
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    MatCardModule, MatButtonModule, MatTabsModule, MatInputModule, MatIconModule, 
    FooterComponent, FormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'LoginAngular_AOLC';

  // Variables de login
  log_gmail: string = '';
  log_password: string = '';
  
  // Variables de registro
  reg_email: string = '';
  reg_password: string = '';
  reg_conf_password: string = '';
  
  hidePassword: boolean = true;
  currentYear: number = new Date().getFullYear();
  
  constructor(
    private router: Router,
    private userService: UserService, 
    private globalUserService: GlobalUserService
  ) {}

  ngOnInit(): void {}

  // Lógica para mostrar/ocultar la contraseña
  verContrase() {
    this.hidePassword = !this.hidePassword;
  }

  // Lógica para iniciar sesión
  ingresar() {
    this.userService.getUsers().subscribe(
      (users) => {
        const validUser = users.find(
          user => user.correo === this.log_gmail && user.password === this.log_password
        );
        // Si los datos de login son correctos
        if (validUser) {
          alert('Inicio de sesión exitoso');
          console.log('Éxito');
          // Guardar datos del usuario globalmente
          this.globalUserService.setUserImageUrl(validUser.foto);
          this.globalUserService.setUserName(validUser.correo);
          this.router.navigate(['/home']);
        } else {
          console.log('Correo o contraseña incorrectos');
          alert('Correo o contraseña incorrectos. Intente de nuevo.');
        }

        // Mostrar todos los correos y contraseñas en consola (solo para desarrollo)
        const userCredentials = users.map(user => ({
          email: user.email,
          password: user.password
        }));
        console.log('Correos y contraseñas:', userCredentials);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // Lógica de registro de usuario
  registrar() {
    console.log('Registrando usuario...');
    // Aquí puedes agregar la lógica de registro según sea necesario
  }

  // Lógica del formulario de inicio de sesión (para la segunda parte del código)
  onSubmit(): void {
    console.log('Correo:', this.log_gmail);
    console.log('Contraseña:', this.log_password);
  }
}

