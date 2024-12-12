import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonApiResponse } from './comidas.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../../comidas-details/comidas-details.component';
import { PokemonEditComponent } from '../usuarios-edit/usuarios-edit.component';
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
  templateUrl: './comidas-lista.component.html',
  styleUrls: ['comidas-lista.component.css'],
})
export class UsuariosListaComponent implements OnInit {
  tiposPokemon: string[] = ['Todos']; // Se inicializa con "Todos"
  todosLosPokemones: Pokemon[] = []; // Para conservar todos los datos originales

  displayedColumns: string[] = [
    'id',
    'nombre',
    'habilidades',
    'tipo',
    'region',
    'imagen',
    'detalles',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Pokemon>([]);
  searchQuery: string = ''; // Variable para la búsqueda
  selectedType: string = 'Todos'; // Tipo seleccionado por defecto

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) {
    this.dataSource.filterPredicate = (data: Pokemon, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
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
        const pokemonData: Pokemon[] = response.results.map((pokemon, index) => {
          const id = index + 1; // Calcula el ID antes de usarlo
          return {
            id: id, // Asigna el ID al objeto
            nombre: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            habilidades: 'No disponible',
            tipo: 'No disponible',
            url: pokemon.url,
            generacion: this.getPokemonGeneracion(id), // Ahora ID es reconocido
          };
        });

        pokemonData.forEach((pokemon) => {
          this.pokemonService
            .getPokemonDetails(pokemon.url)
            .subscribe((details) => {
              pokemon.habilidades = details.abilities
                .map((ability: any) => ability.ability.name)
                .join(', ');
              pokemon.tipo = details.types
                .map((type: any) => type.type.name)
                .join(', ');
              pokemon.imagen =
                details.sprites.front_default || '/assets/default-pokemon.png';
              this.dataSource.data = [...pokemonData];
              this.todosLosPokemones = [...pokemonData];

              // Actualizamos los tipos únicos
              const tipos = details.types.map((type: any) => type.type.name);
              this.tiposPokemon = Array.from(
                new Set(['Todos', ...this.tiposPokemon, ...tipos])
              );
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
      data: { ...pokemon },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        const index = this.dataSource.data.findIndex(
          (p) => p.id === result.data.id
        );
        if (index >= 0) {
          this.dataSource.data[index] = result.data;
          this.dataSource.data = [...this.dataSource.data];
        }
      } else if (result?.action === 'delete') {
        this.dataSource.data = this.dataSource.data.filter(
          (p) => p.id !== result.data.id
        );
      }
    });
  }

  eliminarPokemon(pokemon: Pokemon): void {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar a ${pokemon.nombre}?`
    );
    if (confirmacion) {
      this.dataSource.data = this.dataSource.data.filter(
        (p) => p.id !== pokemon.id
      );
    }
  }

  // Funciones para filtro y búsqueda
  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim().toLowerCase();
    this.applyCombinedFilters();
  }

  filterByType(type: string): void {
    this.selectedType = type;
    this.applyCombinedFilters();
  }

  resetFilters(): void {
    this.selectedType = 'Todos';
    this.dataSource.data = this.todosLosPokemones;
    this.searchQuery = '';
    this.dataSource.filter = '';
    const inputElement = document.getElementById('idBusqueda') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  applyCombinedFilters(): void {
    this.dataSource.data = this.todosLosPokemones.filter((pokemon) => {
      const matchesType =
        this.selectedType === 'Todos' ||
        pokemon.tipo.toLowerCase().includes(this.selectedType.toLowerCase());
      const matchesSearch =
        this.searchQuery === '' ||
        pokemon.nombre.toLowerCase().includes(this.searchQuery);
      return matchesType && matchesSearch;
    });
  }

  getPokemonGeneracion(id: number): string {
    if (id >= 1 && id <= 151) {
      return 'Kanto';
    } else if (id >= 152 && id <= 251) {
      return 'Johto';
    } else if (id >= 252 && id <= 386) {
      return 'Hoenn 3';
    } else if (id >= 387 && id <= 493) {
      return 'Sinnoh';
    } else if (id >= 494 && id <= 649) {
      return 'Unova';
    } else if (id >= 650 && id <= 721) {
      return 'Kalos';
    } else if (id >= 722 && id <= 809) {
      return 'Alola';
    } else if (id >= 810 && id <= 905) {
      return 'Galar';
    } else {
      return 'Paldea';
    }
  }

  //Funcion para filtar por region
  filterByRegion(region: string) {
    if (region === 'Todos') {
      this.dataSource.data = [...this.todosLosPokemones]; // Muestra todos los Pokémon
    } else {
      this.dataSource.data = this.todosLosPokemones.filter(
        (pokemon) => pokemon.generacion === region
      );
    }
  }
  
}
