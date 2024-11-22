import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { GlobalUserService } from '../services/global-user.service';

// Interfaz para tipar usuarios
interface User {
  id: number;
  name: { firstname: string; lastname: string };
  email: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MenuComponent, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'], // Corregido a 'styleUrls'
})
export class HeaderComponent implements OnInit {
  users: User[] = []; // Tipado con interfaz
  currentUser: User | null = null; // Usuario actual

  constructor(private userService: UserService, 
    private globalUserService: GlobalUserService) {}
    userImageUrl: string = '';
    userName: string= '';

  ngOnInit(): void {
    this.userImageUrl = this.globalUserService.getUserImageUrl();
    this.userName = this.globalUserService.getUserName();
    // Obtener los usuarios
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.currentUser = this.users[0]; // Simulando un usuario actual
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
}
