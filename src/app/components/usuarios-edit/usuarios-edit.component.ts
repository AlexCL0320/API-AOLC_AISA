import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Usuario } from '../usuarios-lista/usuarios.interface';

@Component({
  selector: 'app-user-edit',
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
        <h1>Editar Usuario: {{ data.nombre }} {{ data.apellidoP }}</h1>
        <button mat-icon-button mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div mat-dialog-content>
        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Nombre</mat-label>
          <input matInput [(ngModel)]="data.nombre" />
        </mat-form-field>
        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Apellido Paterno</mat-label>
          <input matInput [(ngModel)]="data.apellidoP" />
        </mat-form-field>
        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Apellido Materno</mat-label>
          <input matInput [(ngModel)]="data.apellidoM" />
        </mat-form-field>
        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Correo</mat-label>
          <input matInput [(ngModel)]="data.correo" />
        </mat-form-field>
        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Contraseña</mat-label>
          <input matInput type="password" [(ngModel)]="data.password" />
        </mat-form-field>
        <img
          [src]="data.foto"
          alt="Foto de {{ data.nombre }}"
          style="width: 200px; height: 200px; border-radius: 50%; margin-top: 15px;"
        />
      </div>
      <div mat-dialog-actions>
        <button
          mat-raised-button
          style="color:white; background-color: #568c58; border-radius: 6px; height: 40px; width: 120px; margin-top: 2%; margin-left: 2%;"
          (click)="confirmSave()"
        >
          Guardar
        </button>
        <button
          mat-raised-button
          style="color:white; background-color: #af2945; border-radius: 6px; height: 40px; width: 120px; margin-top: 2%; margin-left: 2%;"
          mat-dialog-close
        >
          Cancelar
        </button>
      </div>
    </div>
  `,
  styleUrls: ['usuarios-edit.component.css'],
})
export class UserEditComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialogRef: MatDialogRef<UserEditComponent>
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
