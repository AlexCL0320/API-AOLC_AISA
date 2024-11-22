import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';  // Asegúrate de que la ruta sea correcta
import { GlobalUserService } from '../services/global-user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule, MatButtonModule, MatTabsModule, MatInputModule, FormsModule, MatIconModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'LoginAngular_AOLC';

  // variables 
  log_gmail: string = '';
  log_password: string = '';
  reg_email: string = '';
  reg_password: string = '';
  reg_conf_password: string = '';

  hidePassword: boolean = true;
  constructor(private router: Router, private userService: UserService, 
    private globalUserService: GlobalUserService) {}
  verContrase() {
    this.hidePassword = !this.hidePassword;
  }
  ingresar() {
     // obtener usuarios con la api
     this.userService.getUsers().subscribe(
      (users) => {
        const validUser = users.find(
          user => user.login === this.log_gmail && user.node_id === this.log_password
        );
        //validar contraseña y gmail
        //si son correctos
        if (validUser) {
          alert('Inicio de sesión exitoso');
          console.log('Exito');
          // Guardar la URL de la imagen del usuario
          this.globalUserService.setUserImageUrl(validUser.avatar_url);
          this.globalUserService.setUserName(validUser.login);
          this.router.navigate(['/home']);  
        } else {
          console.log('Correo o contraseña incorrectos');
          alert('Correo o contraseña incorrectos. Intente de nuevo.');
        }
        // ver usuarios y contraseñas en consola
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

  registrar() {
    console.log('Registrando usuario...');
  }
}
