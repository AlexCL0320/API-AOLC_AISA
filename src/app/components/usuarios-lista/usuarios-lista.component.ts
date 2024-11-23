import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonApiResponse } from './pokemon.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../../pokemon-details/pokemon-details.component';
import { PokemonEditComponent } from '../pokemon-edit/pokemon-edit.component';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';

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
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatInput,
  ],
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['usuarios-lista.component.css'],
})
export class UsuariosListaComponent implements OnInit {
  // Incluimos las nuevas columnas: 'detalles' y 'acciones'
  tiposPokemon: string[] = []; // Se llenará dinámicamente
  todosLosPokemones: Pokemon[] = []; // Para conservar todos los datos originales

  displayedColumns: string[] = [
    'id',
    'nombre',
    'habilidades',
    'tipo',
    'imagen',
    'detalles',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Pokemon>([]);  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) {
    this.dataSource.filterPredicate = (data: Pokemon, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      // Busca en las propiedades relevantes
      return (
        data.nombre.toLowerCase().includes(filterValue) || 
        data.tipo.toLowerCase().includes(filterValue) || 
        data.habilidades.toLowerCase().includes(filterValue)
      );
    };
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(
      (response: PokemonApiResponse) => {
        const pokemonData: Pokemon[] = response.results.map(
          (pokemon, index) => ({
            id: index + 1, // Auto-incremental
            nombre:
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), // Capitalizamos el nombre
            habilidades: 'No disponible', // Habilidades requerirán una consulta extra
            tipo: 'No disponible', // Tipo también será consultado
            url: pokemon.url, // Guardamos la URL para detalles adicionales
          })
        );

        // Consultamos los detalles de cada Pokémon
        pokemonData.forEach((pokemon) => {
          this.pokemonService.getPokemonDetails(pokemon.url).subscribe((details) => {
            pokemon.habilidades = details.abilities.map((ability: any) => ability.ability.name).join(', ');
            pokemon.tipo = details.types.map((type: any) => type.type.name).join(', ');
            pokemon.imagen = details.sprites.front_default || '/assets/default-pokemon.png';
            this.dataSource.data = [...pokemonData];
            this.todosLosPokemones = [...pokemonData]; // Guardamos todos los datos originales

            // Obtener tipos únicos
            const tipos = details.types.map((type: any) => type.type.name);
            this.tiposPokemon = Array.from(new Set([...this.tiposPokemon, ...tipos]));
          });
        });

        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  // Métodos para las acciones
  verDetalles(pokemon: Pokemon): void {
    this.dialog.open(PokemonDetailsComponent, {
      data: pokemon,
      width: '400px',
    });
  }

  editarPokemon(pokemon: Pokemon): void {
    console.log('Editar Pokémon:', pokemon);

    const dialogRef = this.dialog.open(PokemonEditComponent, {
      data: { ...pokemon }, // Pasamos una copia del Pokémon a editar
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        console.log('Guardando cambios del Pokémon:', result.data);
        // Aquí puedes implementar la lógica para guardar cambios, como una llamada al servicio
        const index = this.dataSource.data.findIndex(
          (p) => p.id === result.data.id
        );
        if (index >= 0) {
          this.dataSource.data[index] = result.data;
          this.dataSource.data = [...this.dataSource.data]; // Refrescar el dataSource
        }
      } else if (result?.action === 'delete') {
        console.log('Eliminando Pokémon:', result.data);
        // Implementar lógica para eliminar el Pokémon
        this.dataSource.data = this.dataSource.data.filter(
          (p) => p.id !== result.data.id
        );
      }
    });
  }

  eliminarPokemon(pokemon: Pokemon): void {
    console.log('Eliminar Pokémon:', pokemon);
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar a ${pokemon.nombre}?`
    );
    if (confirmacion) {
      this.dataSource.data = this.dataSource.data.filter(
        (p) => p.id !== pokemon.id
      );
      console.log(`Pokémon eliminado: ${pokemon.nombre}`);
    } else {
      console.log('Eliminación cancelada.');
    }
  }

  //Funciones para filtro y busqueda
  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement; // Asegura que el target es un HTMLInputElement
    const filterValue = input.value.trim().toLowerCase(); // Obtenemos el valor del input
    this.dataSource.filter = filterValue; // Angular Material se encargará de usar el filterPredicate
  }
  

  filterByType(type: string): void {
    this.dataSource.data = this.todosLosPokemones.filter((pokemon) =>
      pokemon.tipo.toLowerCase().includes(type.toLowerCase())
    );
  }

  filterLegendary(): void {
    this.dataSource.data = this.todosLosPokemones.filter(
      (pokemon) => pokemon.tipo.includes('legendary') || pokemon.tipo.includes('mythical')
    );
  }

  resetFilters(): void {
    this.dataSource.data = [...this.todosLosPokemones];
  }
}
