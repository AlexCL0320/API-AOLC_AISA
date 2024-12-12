import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

/**
 * @title Basic cards
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterOutlet, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  currentYear: number = new Date().getFullYear();
}




