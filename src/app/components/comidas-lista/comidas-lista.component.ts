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
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'comidas-lista',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
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
  // Definir displayedColumns aquí
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

  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadComidas();
  }

  loadComidas() {
    this.comidaService.getComidas().subscribe(
      (response) => {
        console.log('Comidas obtenidas:', response);
        this.comidas = response.data;
        this.dataSource.data = this.comidas;
        console.log('Datos recibidos:', this.dataSource);
        this.dataSource.paginator = this.paginator;
      },

      (error) => {
        console.error('Error al obtener las comidas:', error);
      }
    );
  }

  verComida(id: number) {
    this.comidaService.getComidaById(id).subscribe(
      (response) => {
        console.log('Detalles de la comida:', response);
      },
      (error) => {
        console.error('Error al obtener la comida:', error);
      }
    );
  }

  crearComida() {
    const nuevaComida = {
      nombre: 'Pizza Mexicana',
      ingredientes: 'Chorizo, jalapeños, maíz, queso mozzarella',
      categoria: 'Pizza',
      precio: '12.99',
      detalles: '',
    };

    this.comidaService.createComida(nuevaComida).subscribe(
      (response) => {
        console.log('Comida creada exitosamente:', response);
        this.loadComidas();
      },
      (error) => {
        console.error('Error al crear la comida:', error);
      }
    );
  }

  actualizarComida(id: number) {
    const comidaActualizada = {
      nombre: 'Pizza Mexicana Actualizada',
      ingredientes: 'Chorizo, jalapeños, maíz, queso mozzarella, cebolla',
      categoria: 'Pizza',
      precio: '13.99',
      detalles: 'https://example.com/image-updated.jpg',
    };

    this.comidaService.updateComida(id, comidaActualizada).subscribe(
      (response) => {
        console.log('Comida actualizada exitosamente:', response);
        this.loadComidas();
      },
      (error) => {
        console.error('Error al actualizar la comida:', error);
      }
    );
  }

  eliminarComida(id: number) {
    this.comidaService.deleteComida(id).subscribe(
      (response) => {
        console.log('Comida eliminada exitosamente:', response);
        this.loadComidas();
      },
      (error) => {
        console.error('Error al eliminar la comida:', error);
      }
    );
  }
}
