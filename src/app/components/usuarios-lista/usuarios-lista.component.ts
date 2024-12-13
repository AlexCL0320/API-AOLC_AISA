import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { UserDetailsComponent } from '../../usuarios-details/usuarios-details.component';
import { UserEditComponent } from '../usuarios-edit/usuarios-edit.component';
import { UsuarioInterface, Usuario } from './usuarios.interface';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatIcon,
    MatDialogModule,
    HeaderComponent,
    FooterComponent,
    MatFormField,
    MatLabel,
    MatInputModule
  ],
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['usuarios-lista.component.css'],
})
export class UsuariosListaComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellidoP',
    'apellidoM',
    'correo',
    'foto',
    'detalles',
    'acciones',
  ];

  // Esta propiedad almacenará los usuarios originales
  usuariosOriginales: Usuario[] = [];

  // Esta propiedad es para la fuente de datos de la tabla
  dataSource = new MatTableDataSource<Usuario>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        // Guardamos los usuarios originales para poder restaurarlos más tarde
        this.usuariosOriginales = users.map((user: any) => ({
          id: user.id,
          nombre: user.nombre,
          apellidoP: user.apellidoP,
          apellidoM: user.apellidoM,
          correo: user.correo,
          foto: user.foto,password: '',
        }));
        this.dataSource.data = [...this.usuariosOriginales];
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  // Método para mostrar detalles del usuario
  verDetalles(usuario: Usuario): void {
    this.dialog.open(UserDetailsComponent, {
      data: usuario,
      width: '400px',
    });
  }

  // Método para editar un usuario
  editarUsuario(usuario: Usuario): void {
    console.log('Editar Usuario:', usuario);
  
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: { ...usuario },
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        console.log('Los datos del usuario enviados son:', result.data);
        this.userService.editUser(result.data.id, result.data).subscribe(
          (response) => {
            // Si la actualización fue exitosa, buscamos el índice y lo actualizamos
            const index = this.dataSource.data.findIndex(
              (u) => u.id === result.data.id
            );
            if (index >= 0) {
              this.dataSource.data[index] = result.data;
              // Refrescamos la fuente de datos
              this.dataSource.data = [...this.dataSource.data];
            }
          },
          (error) => {
            console.error('Error al editar usuario:', error);
          }
        );
      } else if (result?.action === 'delete') {
        this.eliminarUsuario(result.data); // También puedes manejar la eliminación desde aquí
      }
    });
  }

  // Método para eliminar un usuario
  eliminarUsuario(usuario: Usuario): void {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar a ${usuario.nombre}?`
    );
    if (confirmacion) {
      this.userService.deleteUser(usuario.id).subscribe(
        () => {
          // Si la eliminación en la API fue exitosa, actualizamos la vista
          this.dataSource.data = this.dataSource.data.filter(
            (u) => u.id !== usuario.id
          );
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }

  // Método de búsqueda
  buscarUsuario(event: Event): void {
    const valorBusqueda = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (valorBusqueda === '') {
      // Si el campo de búsqueda está vacío, restauramos los datos originales
      this.dataSource.data = [...this.usuariosOriginales];
    } else {
      // Filtrar los usuarios por nombre, apellido y correo
      this.dataSource.data = this.usuariosOriginales.filter((usuario: Usuario) =>
        usuario.nombre.toLowerCase().includes(valorBusqueda) ||
        usuario.apellidoP.toLowerCase().includes(valorBusqueda) ||
        usuario.apellidoM.toLowerCase().includes(valorBusqueda) ||
        usuario.correo.toLowerCase().includes(valorBusqueda)
      );
    }

    // Si hay un paginator, reiniciamos a la primera página
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
