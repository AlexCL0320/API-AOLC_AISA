import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comida } from '../components/comidas-lista/comidas.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-comida-details',
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
      <img [src]="data.detalles" alt="{{ data.nombre }}" />
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>Nombre:</strong> {{ data.nombre }}</p>
      <p><strong>Ingredientes:</strong> {{ data.ingredientes }}</p>
      <p><strong>Categoría:</strong> {{ data.categoria }}</p>
      <p><strong>Precio:</strong> {{ data.precio }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button style="color:white; font-family: Cascadia Code; background-color: #cd7600; border-color: #cd7600; border-radius: 6px; height: 40px; width: 120px; margin-top: 2%; margin-left: 2%; margin-bottom: 3%;" (click)="onClose()">Cerrar</button>
    </div>
  `,
  styleUrls: ['comidas-details.component.css'],
})
export class ComidaDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Comida,
    private dialogRef: MatDialogRef<ComidaDetailsComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
