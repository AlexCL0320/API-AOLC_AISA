import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../components/usuarios-lista/pokemon.interface';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Detalles de {{ data.nombre }}</h1>
    <div mat-dialog-content>
      <img [src]="data.imagen" alt="{{ data.nombre }}" style="width: 100px; height: 100px; border-radius: 50%;" />
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>Nombre:</strong> {{ data.nombre }}</p>
      <p><strong>Habilidades:</strong> {{ data.habilidades }}</p>
      <p><strong>Tipo:</strong> {{ data.tipo }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cerrar</button>
    </div>
  `,
  styleUrls: [],
})
export class PokemonDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pokemon) {}
}
