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




@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatDialogModule],
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css'],
})
export class UsuariosListaComponent implements OnInit {
  // Incluimos las nuevas columnas: 'detalles' y 'acciones'
  displayedColumns: string[] = ['id', 'nombre', 'habilidades', 'tipo', 'imagen', 'detalles', 'acciones'];
  dataSource = new MatTableDataSource<Pokemon>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(
      (response: PokemonApiResponse) => {
        const pokemonData: Pokemon[] = response.results.map(
          (pokemon, index) => ({
            id: index + 1, // Auto-incremental
            nombre: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), // Capitalizamos el nombre
            habilidades: 'No disponible', // Habilidades requerirán una consulta extra
            tipo: 'No disponible', // Tipo también será consultado
            url: pokemon.url, // Guardamos la URL para detalles adicionales
          })
        );

        // Consultamos los detalles de cada Pokémon
        pokemonData.forEach((pokemon) => {
          this.pokemonService.getPokemonDetails(pokemon.url).subscribe((details) => {
            pokemon.habilidades = details.abilities
              .map((ability: any) => ability.ability.name)
              .join(', ');
            pokemon.tipo = details.types
              .map((type: any) => type.type.name)
              .join(', ');
            pokemon.imagen = details.sprites.front_default || '/assets/default-pokemon.png';

            this.dataSource.data = [...pokemonData]; // Actualizamos el dataSource con los detalles.
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
    // Implementa la lógica para editar el Pokémon
  }

  eliminarPokemon(pokemon: Pokemon): void {
    console.log('Eliminar Pokémon:', pokemon);
    // Implementa la lógica para eliminar el Pokémon
  }
}
