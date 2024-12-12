import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterModule],
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  usuarios(): void {
    this.router.navigate(['/usuarios']);
  }

  home(): void {
    this.router.navigate(['/home']);
  }

  comidas(): void {
    this.router.navigate(['/comidas']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  
}
