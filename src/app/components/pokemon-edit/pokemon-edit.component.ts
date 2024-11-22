import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

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
  ]  ,
  template: `
    <h1 mat-dialog-title>Editar Pokémon: {{ data.nombre }}</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="data.nombre" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Habilidades</mat-label>
        <input matInput [(ngModel)]="data.habilidades" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Tipo</mat-label>
        <input matInput [(ngModel)]="data.tipo" />
      </mat-form-field>
      <img
        [src]="data.imagen"
        alt="{{ data.nombre }}"
        style="width: 100px; height: 100px; border-radius: 50%; margin-top: 15px;"
      />
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="save()">Guardar</button>
      <button mat-button (click)="delete()">Eliminar</button>
      <button mat-button mat-dialog-close>Cancelar</button>
    </div>
  `,
  styleUrls: [],
})
export class PokemonEditComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pokemon,
    private dialogRef: MatDialogRef<PokemonEditComponent>
  ) {}

  save(): void {
    // Guardar los cambios y cerrar el diálogo
    this.dialogRef.close({ action: 'save', data: this.data });
  }

  delete(): void {
    // Confirmar eliminación y cerrar el diálogo
    this.dialogRef.close({ action: 'delete', data: this.data });
  }
}
