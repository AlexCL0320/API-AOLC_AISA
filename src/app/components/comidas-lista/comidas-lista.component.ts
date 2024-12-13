import { Component, OnInit, ViewChild } from '@angular/core';
import { ComidaService } from '../../services/comida.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Comida, ComidaResponse } from './comidas.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ComidaEditComponent } from '../comidas-edit/comidas-edit.component';
import { ComidaDetailsComponent } from '../../comidas-details/comidas-details.component';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'comidas-lista',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatIcon,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatInput,
    FooterComponent,
    HeaderComponent,
    MatSort,
  ],
  templateUrl: 'comidas-lista.component.html',
  styleUrls: ['comidas-lista.component.css'],
})
export class ComidasListaComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'ingredientes',
    'categoria',
    'precio',
    'detalles',
    'detalles2',
    'acciones',
  ];
  comidas: Comida[] = [];
  dataSource!: MatTableDataSource<Comida>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private comidaService: ComidaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadComidas();
  }

  loadComidas() {
    this.comidaService.getComidas().subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.comidas = response;
        } else if (response.data && Array.isArray(response.data)) {
          this.comidas = response.data;
        } else {
          console.warn('Estructura inesperada en la respuesta del servicio');
          this.comidas = [];
        }
        this.dataSource = new MatTableDataSource(this.comidas);
        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
        console.error('Error al obtener las comidas:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Método para mostrar detalles de la comida
   */
  verDetalles(comida: Comida): void {
    this.dialog.open(ComidaDetailsComponent, {
      data: comida,
      width: '400px',
    });
  }

  /**
   * Método para editar la comida
   */
  editarComida(comida: Comida): void {
    const dialogRef = this.dialog.open(ComidaEditComponent, {
      data: { ...comida }, // Se clona la comida para no modificar el original
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        this.comidaService.updateComida(result.data.id, result.data).subscribe(
          (response) => {
            const index = this.dataSource.data.findIndex(
              (c) => c.id === result.data.id
            );
            if (index >= 0) {
              this.dataSource.data[index] = result.data;
              this.dataSource.data = [...this.dataSource.data]; // Se actualiza la vista de la tabla
            }
          },
          (error) => {
            console.error('Error al editar la comida:', error);
          }
        );
      } else if (result?.action === 'delete') {
        this.eliminarComida(result.data);
      }
    });
  }

  /**
   * Método para eliminar la comida
   */
  eliminarComida(comida: Comida): void {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar ${comida.nombre}?`
    );
    if (confirmacion) {
      this.comidaService.deleteComida(comida.id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(
            (c) => c.id !== comida.id
          );
        },
        (error) => {
          console.error('Error al eliminar la comida:', error);
        }
      );
    }
  }

  /**
   * Método para filtrar comidas por categoría
   */
  filtrarPorCategoria(categoria: string): void {
    if (categoria === 'Limpiar') {
      this.dataSource.data = this.comidas;
    } else {
      this.dataSource.data = this.comidas.filter(
        (comida) => comida.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Método para buscar comida por nombre
   */
  buscarComida(event: Event): void {
    const valorBusqueda = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    this.dataSource.data = this.comidas.filter(comida => 
      comida.nombre.toLowerCase().includes(valorBusqueda) || 
      String(comida.precio).toLowerCase().includes(valorBusqueda)
    );
    
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  /**
 * Método para limpiar los filtros y la barra de búsqueda
 */
limpiarFiltros(): void {
  // Restaurar la tabla con todos los datos
  this.dataSource.data = this.comidas;
  
  // Reiniciar la paginación
  if (this.paginator) {
    this.paginator.firstPage();
  }

  // Limpiar el campo de búsqueda (opcional)
  const inputBusqueda = document.getElementById('idBusqueda') as HTMLInputElement;
  if (inputBusqueda) {
    inputBusqueda.value = '';
  }
}
}
