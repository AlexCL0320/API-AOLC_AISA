import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../components/usuarios-lista/usuarios.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatIcon],
  template: `
    <div class="dialog-header">
      <h1>Detalles de {{ data.nombre }} {{ data.apellidoP }} {{ data.apellidoM }}</h1>
      <button mat-icon-button (click)="onClose()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div mat-dialog-content class="dialog-content">
      <img [src]="data.foto" alt="Foto de {{ data.nombre }}" class="user-image" />
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>Nombre:</strong> {{ data.nombre }} {{ data.apellidoP }} {{ data.apellidoM }}</p>
      <p><strong>Correo:</strong> {{ data.correo }}</p>
    </div>
    <div mat-dialog-actions>
      <button 
        mat-raised-button 
        style="color:white; font-family: Cascadia Code; background-color: #425953; border-color: #425953; border-radius: 6px; height: 40px; width: 120px; margin-top: 2%; margin-left: 2%; margin-bottom: 3%;"
        (click)="onClose()"
      >Cerrar</button>
    </div>
  `,
  styleUrls: ['usuarios-details.component.css'],
})
export class UserDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialogRef: MatDialogRef<UserDetailsComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
