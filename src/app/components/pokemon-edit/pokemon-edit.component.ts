import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Pokemon } from '../usuarios-lista/pokemon.interface';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    NgIf,
    MatIcon,
  ],
  template: `
  <div style="border-radius: 12px;">
    <div class="dialog-header">
      <h1>Editar Pokémon: {{ data.nombre }}</h1>
      <button mat-icon-button mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label style="font-family: Cascadia Code;">Nombre</mat-label>
        <input style="font-family: Cascadia Code;" matInput [(ngModel)]="data.nombre" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label style="font-family: Cascadia Code;" >Habilidades</mat-label>
        <input style="font-family: Cascadia Code;" matInput [(ngModel)]="data.habilidades" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label style="font-family: Cascadia Code;">Tipo</mat-label>
        <input style="font-family: Cascadia Code;" matInput [(ngModel)]="data.tipo" />
      </mat-form-field>
      <img
        [src]="data.imagen"
        alt="{{ data.nombre }}"
        style="width: 200px; height: 200px; border-radius: 50%; margin-top: 15px;"
      />
    </div>
    <div mat-dialog-actions>
      <button style="color:white; font-family: Cascadia Code; background-color: #568c58; border-color: #568c58; border-radius: 6px; height: 40px;  width: 120px; margin-top: 2%; margin-left: 2%; margin-bottom: 3%;" mat-button (click)="confirmSave()">Guardar</button>
      <button style="color:white; font-family: Cascadia Code; background-color: #af2945; border-color: #af2945; border-radius: 6px; height: 40px;  width: 120px; margin-top: 2%; margin-left: 2%; margin-bottom: 3%;" mat-button mat-dialog-close>Cancelar</button>
    </div>
    </div>
  `,
  styleUrls: ['pokemon-edit.component.css'],
})
export class PokemonEditComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pokemon,
    private dialogRef: MatDialogRef<PokemonEditComponent>
  ) {}

  confirmSave(): void {
    const confirmacion = window.confirm(
      '¿Deseas guardar los cambios realizados?'
    );
    if (confirmacion) {
      this.dialogRef.close({ action: 'save', data: this.data });
    } else {
      console.log('Guardado cancelado.');
    }
  }
}
