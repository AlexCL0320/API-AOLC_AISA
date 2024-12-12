import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pokemon } from '../components/usuarios-lista/usuarios.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [MatIcon],
  template: `
    <div class="dialog-header">
      <h1>Detalles de {{ data.nombre }}</h1>
      <button mat-icon-button (click)="onClose()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div mat-dialog-content class="dialog-content">
      <img [src]="data.imagen" alt="{{ data.nombre }}" />
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>Nombre:</strong> {{ data.nombre }}</p>
      <p><strong>Habilidades:</strong> {{ data.habilidades }}</p>
      <p><strong>Tipo:</strong> {{ data.tipo }}</p>
      <p><strong>Generacion:</strong> {{ data.generacion }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button style="color:white; font-family: Cascadia Code; background-color: #cd7600; border-color: #cd7600; border-radius: 6px; height: 40px;  width: 120px; margin-top: 2%; margin-left: 2%; margin-bottom: 3%;" (click)="onClose()">Cerrar</button>
    </div>
  `,
  styleUrls: ['comidas-details.component.css'],
})
export class PokemonDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pokemon,
    private dialogRef: MatDialogRef<PokemonDetailsComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
