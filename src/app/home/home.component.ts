import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet, RouterLink } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from "../footer/footer.component";
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { UsuariosListaComponent } from "../components/usuarios-lista/usuarios-lista.component"; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule, HeaderComponent, FooterComponent,
    RouterLink, RouterOutlet, MenuComponent, CommonModule, UsuariosListaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  logout() {
    console.log('Logging out...');
    // Agrega la lógica de cierre de sesión aquí, como limpiar el almacenamiento local, redirigir, etc.
  }
}
