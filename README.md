# Login - API Pokemons 

Objetivo: Generación de un login que solicite al usuario ingresar un nombre de usuario y contraseña, estos datos se verificaran con la lista de usuarios consumidos por la api; si el nombre de usuario y password coinciden con algun registro se permitira el acceso a la ventana home donde se consultara  una segunda API referente a Pokemons, caso contrario se mostrara una alerta con el mensaje "Usuario Invalido"

![image](https://github.com/user-attachments/assets/5e745f01-a820-4eab-adf3-6d96700ef649)


# Consumo de API sobre Pokemons
![image](https://github.com/user-attachments/assets/be6e3c94-603b-4569-ac7b-819ad208fa19)

Proyecto Generado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.
## Explicacion de la Practica 

Para comenzar  con el desarrollo de la practica es necesario contar con algunos  requisitos de instalacioón previos a la ejecución del repositorio

### Requisitos Previos
1.- IDE de desarrollo (VS CODE)

2.- Instalación del Framework ANGULAR CLI vs 18.2.10

3.- Instalación de librerias npm

4.- Instalación de librerias boostrap

5.- Instalación de libreria ngx pagination

6.- Instalación de Material Desing (Para la incorporación de componentes)

Para poder ejecutar de forma correcta el contenido del repositorio en tu computador es necesario que una vez clonado el repositorio en tu area de trabajo se realice la instalción de las librerias anteriormente mencionadas a traves de tu entorno de desarrollo (IDE).

## Desarollo de la Practica 

### 1.- Creación del Proyecto
Para comenzar a trabajar el consumo de APIS web y la validación del login con base en los datos recuperados será necesaria la creación de un proyecto en ANGULAR a traves del cual se pueda consultar el contenido de una API haciendo uso de servicios; para finalmente validar que el usuario ingresado en el formulario del login se encuentre en la lista de usuarios contenidas en el JSON de consulta.

Por ello para la generación de un nuevo proyecto en Angular debemos abrir la terminal o consola, dentro de ella ubicarno en el directorio donde deseemos crear nuestro poryecto y ejecutar los siguientes comandos:

•	ng new LoginAngular_AOLC --routing --standalone=false

•	Ingresa en la carpeta del proyecto:

•	cd LoginAngular_AOLC

•	aceptar las opciones predeterminadas cuando se solicite.

![image](https://github.com/user-attachments/assets/2f133b27-f40b-476c-9051-3eac6076441c)

Comandos de Creación 

![image](https://github.com/user-attachments/assets/f551edb0-1d0b-4050-ae12-4f497330ffd5)

Proyecto Base Generado


### 3.-Generación de los componentes login para el Consumo de API
Una vez creado el proyecto base es necesario crear los componentes donde se trabajaran los elementos que contrendran nuestro sitio web para la validacion del login y consulta de los pokemons, para ello a continuacion se detalla la instruccion de creación del componente y el codigo de sus archivos .html, .ts, .ccs

#### Componente Login
Instrucción de creacion:
    
    ng generate module login; ng generate component login --module=login

Codigo login.html

    <div  class="container text-center mt-5" style="display: flex; align-items: center; justify-content: center;  height: 100vh;">
    <mat-card class="example-card" style="display: flex; justify-content: center;  align-items: center; border-radius: 12px; background: linear-gradient(135deg, #dec604, #7a6200) " appearance="outlined">
      <div mat-card-avatar class="example-header-image"></div>
      <mat-card-header>    
        <mat-card-title style="color: black; font-size: 16px; font-weight: bold; font-family: Cascadia Code; ">Bienvenido Entrenador</mat-card-title>
        <br><br>
        <!--<mat-card-subtitle>Dog Breed</mat-card-subtitle>-->
      </mat-card-header>
      <mat-card-content>
        <mat-form-field style="width: 400px; margin-top: 6%;" class="llenarInformacion">
          <mat-label style="font-family: Cascadia Code;" >Correo Electrónico o Usuario</mat-label>
          <input style="font-family: Cascadia Code;" type="email" matInput placeholder="Ingresa Usuario" [(ngModel)]="log_gmail">
        </mat-form-field>
        <br>
        <br>
        <mat-form-field style="width: 400px; border-radius: 28px;" class="llenarInformacion">
          <mat-label style="font-family: Cascadia Code;" >Contraseña</mat-label>
          <input  style="font-family: Cascadia Code;" type="password" matInput placeholder="Ingresa Contraseña" [(ngModel)]="log_password">
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions style="justify-content: center; padding-bottom: 1%;">
        <button mat-flat-button style="background-color: #2A313C; color: white; font-style: normal; width: 200px;" (click)="ingresar()"> Acceder</button>
      </mat-card-actions>
    </mat-card>
    </div>

Codigo login.ts

    import {ChangeDetectionStrategy, Component} from '@angular/core';
    import {MatButtonModule} from '@angular/material/button';
    import { Router } from '@angular/router';
    import { RouterOutlet } from '@angular/router';
    import { MatCardModule } from '@angular/material/card';
    import { MatTabsModule } from '@angular/material/tabs';
    import { MatInputModule } from '@angular/material/input';
    import { FormsModule } from '@angular/forms';
    import { MatIconModule } from '@angular/material/icon';
    import { UserService } from '../services/user.service';  // Asegúrate de que la ruta sea correcta
    import { GlobalUserService } from '../services/global-user.service';
    
    
    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [ MatCardModule, MatButtonModule, MatButtonModule, MatTabsModule, MatInputModule, FormsModule, MatIconModule, RouterOutlet],
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css']
    })
    export class LoginComponent {
      title = 'LoginAngular_AOLC';
    
      // variables 
      log_gmail: string = '';
      log_password: string = '';
      reg_email: string = '';
      reg_password: string = '';
      reg_conf_password: string = '';
    
      hidePassword: boolean = true;
      constructor(private router: Router, private userService: UserService, 
        private globalUserService: GlobalUserService) {}
      verContrase() {
        this.hidePassword = !this.hidePassword;
      }
      ingresar() {
         // obtener usuarios con la api
         this.userService.getUsers().subscribe(
          (users) => {
            const validUser = users.find(
              user => user.login === this.log_gmail && user.node_id === this.log_password
            );
            //validar contraseña y gmail
            //si son correctos
            if (validUser) {
              alert('Inicio de sesión exitoso');
              console.log('Exito');
              // Guardar la URL de la imagen del usuario
              this.globalUserService.setUserImageUrl(validUser.avatar_url);
              this.globalUserService.setUserName(validUser.login);
              this.router.navigate(['/home']);  
            } else {
              console.log('Correo o contraseña incorrectos');
              alert('Correo o contraseña incorrectos. Intente de nuevo.');
            }
            // ver usuarios y contraseñas en consola
            const userCredentials = users.map(user => ({
              email: user.email,
              password: user.password
            }));
            console.log('Correos y contraseñas:', userCredentials);
          },
          (error) => {
            console.error('Error al obtener usuarios:', error);
          }
        );
        
      }
    
      registrar() {
        console.log('Registrando usuario...');
      }
    }

    

Codigo login.css

    .example-card {
    width: 600px;
    height: 450px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    border: black;
    }
  
  
    .example-header-image {
      background-image: url('https://i.pinimg.com/736x/e4/f3/83/e4f383c0344e99637fca46ec3e146403.jpg');
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18%;
      height: 0;
      padding-top: 18%; /* Mantiene el aspecto cuadrado en diferentes pantallas */
      border-radius: 50%; /* Hace que el avatar sea redondo */
      overflow: hidden; /* Oculta cualquier contenido que sobresalga */
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Añade una sombra para darle profundidad */
      margin: 0 auto; /* Centra el avatar horizontalmente en el contenedor */
      margin-top: 0%;
    }

Para la validación del usuario a traves del login a los inputs de usuario y constraseña se les asigna un enlace [(ngModel)] a el modelo de datos (variables) declarado en el archivo login.ts con los siguientes alias

cooreo -> [(ngModel)]="log_gmail"
password -> [(ngModel)]="log_password"

Esto para que a traves de las instrucciones 
    
     this.userService.getUsers().subscribe(
      (users) => {
        const validUser = users.find(
          user => user.login === this.log_gmail && user.node_id === this.log_password
        );
        //validar contraseña y gmail si son correctos
        if (validUser) {
          alert('Inicio de sesión exitoso');
          console.log('Exito');
          // Guardar la URL de la imagen del usuario
          this.globalUserService.setUserImageUrl(validUser.avatar_url);
          this.globalUserService.setUserName(validUser.login);
          this.router.navigate(['/home']);  
        } else {
          console.log('Correo o contraseña incorrectos');
          alert('Correo o contraseña incorrectos. Intente de nuevo.');
        }
        // ver usuarios y contraseñas en consola
        const userCredentials = users.map(user => ({
          email: user.email,
          password: user.password
        }));
        console.log('Correos y contraseñas:', userCredentials);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );

  Se compare el valor de estas variables con los valores recuperados desde la API a traves del servicio user.service y en caso de devolverse un true se conceda el accesso a home y se mande la alerta correspondiente; todo a traves de la funcion ingresar del archivo typescript
          
#### Componente home
Instrucción de creacion:
    
    ng generate module home; ng generate component home --module=home

Codigo home.html

    <div style=" background-color: #212830">
    <app-header></app-header>
    <div style="width: 89%;" class="content">
        <app-usuarios-lista></app-usuarios-lista>
    </div>
    <app-footer></app-footer>
    </div>

Codigo home.ts

    import { Component } from '@angular/core';
    import { MatToolbarModule } from '@angular/material/toolbar';
    import { MatButtonModule } from '@angular/material/button';
    import { MatMenuModule } from '@angular/material/menu';
    import { RouterModule } from '@angular/router';
    import { HeaderComponent } from "../header/header.component";
    import { RouterOutlet, RouterLink } from '@angular/router';
    import { MenuComponent } from "../menu/menu.component";
    import { MatIconModule } from '@angular/material/icon';
    import { FooterComponent } from "../footer/footer.component";
    import { UserService } from '../services/user.service';
    import { CommonModule } from '@angular/common';
    import { UsuariosListaComponent } from "../components/pokemons-lista/pokemon-lista.component"; 
    
    @Component({
      selector: 'app-home',
      standalone: true,
      imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule, HeaderComponent, FooterComponent,
        RouterLink, RouterOutlet, MenuComponent, CommonModule, UsuariosListaComponent],
      templateUrl: './home.component.html',
      styleUrl: './home.component.css'
    })
    export class HomeComponent {
      logout() {
        console.log('Logging out...');
        // Agrega la lógica de cierre de sesión aquí, como limpiar el almacenamiento local, redirigir, etc.
      }
    }


Codigo home.css

    .content{
      margin-left: 12%; 
      background-color: #212830; 
      color: mintcream;
      border-radius: 10px; 
      margin-bottom: 5%; 
      margin-right: 2%; 
      margin-top: 2%; 
      display:flex; 
      justify-content: center;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
      border: black;
      min-height: calc(100vh - 50px); /* Ajusta 50px al tamaño del footer */
      padding-bottom: 50px; /* Evita que el contenido sobrepase el footer */
    
    }

#### Componente Header
Instrucción de creacion:
    
    ng generate module header; ng generate component header --module=header

Codigo header.html

    <mat-card appearance="outlined" class="header">
        <mat-card-content>
            <app-menu></app-menu>
            <a style="padding-left: 2%;" class="social-links" href="https://github.com/AlexCL0320" target="_blank">
                <img src="/assets/git.png" alt="GitHub Logo" width="40" height="40" style="vertical-align: middle;">
            </a> AlexCL0320
        </mat-card-content>
    </mat-card>



Codigo header.ts

    import {ChangeDetectionStrategy, Component} from '@angular/core';
    import {MatCardModule} from '@angular/material/card';
    import { RouterOutlet } from '@angular/router';
    import { MenuComponent } from "../menu/menu.component";
    import { MatIconModule } from '@angular/material/icon';
    /**
     * @title Basic cards
     */
    @Component({
      selector: 'app-header',
      standalone: true,
      imports: [RouterOutlet, MatCardModule, MenuComponent,  MatIconModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      templateUrl: 'header.component.html',
      styleUrl: 'header.component.css'
    })
    
    export class HeaderComponent {
    
    }

Codigo header.css

    .header{
        color:azure;
        background-color: #151b23;
        border-radius: -10px;
        font-size: 12px;
        margin-top: -0.5%;
        padding-bottom: -4%;
    }
    
    .mat-card-content{
    color: azure;
    }

#### Componente Menu
Instrucción de creacion:
    
    ng generate module  menu; ng generate component menu --module=menu

Codigo menu.html
  
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
    <mat-icon>menu</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item>
        <mat-icon>home</mat-icon> <!-- Cambiado a "home" -->
        <span>Inicio</span>
      </button>
      <button mat-menu-item (click)="login()"> 
        <mat-icon>exit_to_app</mat-icon> <!-- Cambiado a "notifications" -->
        <span>Salir</span>
      </button>
    </mat-menu>
      

Codigo menu.ts

    import { Component } from '@angular/core';
    import { MatIconModule } from '@angular/material/icon';
    import { MatMenuModule } from '@angular/material/menu';
    import { MatButtonModule } from '@angular/material/button';
    import { Router, RouterModule } from '@angular/router';
    
    @Component({
      selector: 'app-menu',
      standalone: true,
      imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterModule],
      templateUrl: 'menu.component.html',
      styleUrls: ['menu.component.css']
    })
    export class MenuComponent {
      constructor(private router: Router) {}
    
      login(): void {
        this.router.navigate(['/login']);
      }
    }



Codigo menu.css

    --No se personaliza

#### Componente Footer
Instrucción de creacion:
    
    ng generate module footer; ng generate component footer --module=footer

Codigo footer.html

    <mat-card appearance="outlined" class="footer" style="background-color:#151b23; color: white;">
        <mat-card-content style="display:flex; justify-content:center;">
            <img src="public/../favicon.ico" width="20" height="20" style="vertical-align: middle" style="padding-right: 1.5%"> By Angular
        </mat-card-content>
    </mat-card>



Codigo footer.ts

    import {ChangeDetectionStrategy, Component} from '@angular/core';
    import {MatCardModule} from '@angular/material/card';
    import { RouterOutlet } from '@angular/router';
    
    /**
     * @title Basic cards
     */
    @Component({
      selector: 'app-footer',
      standalone: true,
      imports: [RouterOutlet, MatCardModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      templateUrl: 'footer.component.html',
      styleUrl: './footer.component.css'
    })
    export class FooterComponent {
    
    }

Codigo footer.css

    .footerr{
        color:azure;
        background-color: #151b23;
        border-radius: -20px;
        font-size: 14px;
        margin-top: -3.5%;
        position: fixed;
        width: 100%;
    
    }
    
    .mat-card-content{
    color: azure;
    background-color: #151b23;
    
    }

La presentación de los datos consumidos a traves de la API se realziara a traves de la presentación de una tabla estándar con paginación; por esto se debe crear un nuevo componente del proyecto que se encargue de manejar el contenido html y operaciones TypeScript donde se presentara toda la información referente a los pokemons consultados.

Para ello generaremos un nuevo componente llamado pokemons-lista a traves del siguiente comando

Comando de Generación de Componente pokemons-lista

    • ng generate component components/pokemons-lista
![image](https://github.com/user-attachments/assets/159a3267-ef70-4f26-9d30-dd0246514da7)

La tabla de presentacion tendrá un formato estandar que cuenta con los apartados id, nombre, tipo, habilidades, region, imagen del pokemon junto con columnas adcionales para consultar los detalles del pokemon y realizar operaciones de edición o eliminación sobre los mismos. La configuración de la interfaz de presentacion se realizara en el archivo pokemon-lista.component.html

Codigo pokemons-lista.component.html

    <mat-card style="width: 95%; background-color: transparent">
      <mat-card-header
        style="margin-bottom: 2%; background-color: #cd7600; border-radius: 9px; text-align: center; display: flex; justify-content: center; align-items: center;">
        <mat-card-title>
          <img src="/assets/logo.png" alt="Pokedex" width="150" style="vertical-align: middle;">
        </mat-card-title>
      </mat-card-header>
    
      <!-- Filtros -->
      <mat-card-content style="margin-bottom: -2%;">
        <div style=" display: flex; align-items: left; justify-content: left; gap: 1rem; margin-bottom: 1rem;">
          <button mat-raised-button class="btn" style="background-color: #af2945;" (click)="resetFilters()">Limpiar</button>
        </div>
        <p style="font-family: Cascadia Code;">Region</p>
        <div style=" display: flex; align-items: left; justify-content: left; gap: 1rem; margin-bottom: 1rem;">
          <button mat-raised-button class="btn" style="background-color: #2e4766;" (click)="filterByRegion('Galar')">Galar</button>
          <button mat-raised-button class="btn" style="background-color: #57995a;" (click)="filterByRegion('Alola')">Alola</button>
          <button mat-raised-button class="btn" style="background-color: #848b2d;" (click)="filterByRegion('Unova')"> Unova</button>
          <button mat-raised-button class="btn" style="background-color: #488078;" (click)="filterByRegion('Kanto')">Kanto</button>
        </div>
    
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <mat-form-field class="llenarInformacion"
            style="display: flex; align-items: left; justify-content: left; border-radius: 4px; width: 40%;"
            appearance="fill">
            <mat-label style="color: #2a2a2a; font-family: Cascadia Code;">Tipo</mat-label>
            <mat-select [(value)]="selectedType" (selectionChange)="filterByType($event.value)"
              style="color: #2a313c; font-family: Cascadia Code;">
              <mat-option style="font-family: Cascadia Code; background-color: transparent;"
                *ngFor="let type of tiposPokemon" [value]="type">
                {{ type }}
              </mat-option>
            </mat-select>
          </mat-form-field>
    
          <mat-form-field style="gap: 1rem; width: 30%; margin-top: 1rem; margin-left: 30%;"
            class="filter-input llenarInformacion">
            <mat-label>Buscar</mat-label>
            <input matInput placeholder="Eje. Dialga" id="idBusqueda" (input)="applyFilter($event)">
          </mat-form-field>
        </div>
    
      </mat-card-content>
    
      <mat-card-content style="background-color: #c9c9c9; border-radius: 4px; padding-top: 2%;">
        <table mat-table [dataSource]="dataSource" matSort>
    
          <!-- ID -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef mat-sort-header style="background-color: #193059;">ID</th>
            <td mat-cell *matCellDef="let pokemon"
              [ngStyle]="{ 'background-color': pokemon.id % 2 !== 0 ? '#d4d4d4' : '#c9c9c9' }">
              {{ pokemon.id }}
            </td>
          </ng-container>
    
          <!-- Nombre -->
          <ng-container matColumnDef="nombre">
            <th mat-header-cell *matHeaderCellDef mat-sort-header style="background-color: #113d7d;">Nombre</th>
            <td mat-cell *matCellDef="let pokemon"
              [ngStyle]="{ 'background-color': pokemon.id % 2 !== 0 ? '#d4d4d4' : '#c9c9c9' }">
              {{ pokemon.nombre }}
            </td>
          </ng-container>
    
          <!-- Habilidades -->
          <ng-container matColumnDef="habilidades">
            <th mat-header-cell *matHeaderCellDef style="background-color: #193059;">Habilidades</th>
            <td mat-cell *matCellDef="let pokemon"
              [ngStyle]="{ 'background-color': pokemon.id % 2 !== 0 ? '#d4d4d4' : '#c9c9c9' }">
              {{ pokemon.habilidades }}
            </td>
          </ng-container>
    
          <!-- Tipo -->
          <ng-container matColumnDef="tipo">
            <th mat-header-cell *matHeaderCellDef style="background-color: #113d7d;">Tipo</th>
            <td mat-cell *matCellDef="let pokemon"
              [ngStyle]="{ 'background-color': pokemon.id % 2 !== 0 ? '#d4d4d4' : '#c9c9c9' }">
              {{ pokemon.tipo }}
            </td>
          </ng-container>
     
          <!-- Generacion -->
          <ng-container matColumnDef="region">
            <th mat-header-cell *matHeaderCellDef style="background-color: #193059;">Region</th>
            <td mat-cell *matCellDef="let pokemon"
              [ngStyle]="{ 'background-color': pokemon.id % 2 !== 0 ? '#d4d4d4' : '#c9c9c9' }">
              {{ pokemon.generacion }}
            </td>
          </ng-container>
    
          <!-- Imagen -->
          <ng-container matColumnDef="imagen">
            <th mat-header-cell *matHeaderCellDef style="background-color: #113d7d;">Pokemon</th>
            <td mat-cell *matCellDef="let pokemon"
              [ngStyle]="{ 'background-color': pokemon.id % 2 !== 0 ? '#d4d4d4' : '#c9c9c9' }">
              <img [src]="pokemon.imagen" alt="Imagen de Pokémon" style="width: 100px; height: 100px; border-radius: 50%;">
            </td>
          </ng-container>
    
          <!-- Detalles -->
          <ng-container matColumnDef="detalles">
            <th mat-header-cell *matHeaderCellDef style="background-color: #193059;">Detalles</th>
            <td mat-cell *matCellDef="let pokemon"
              [ngStyle]="{ 'background-color': pokemon.id % 2 !== 0 ? '#d4d4d4' : '#c9c9c9' }">
              <button mat-flat-button
                style="background-color: #2A313C; color: white; font-style: normal; width: 80%; height: 35px; border-radius: 13px;"
                (click)="verDetalles(pokemon)">Ver</button>
            </td>
          </ng-container>
    
          <!-- Acciones -->
          <ng-container matColumnDef="acciones" style="display: flex;  justify-content: center; align-items: center;">
            <th mat-header-cell *matHeaderCellDef style="background-color: #113d7d;">Acciones</th>
            <td mat-cell *matCellDef="let pokemon"
              [ngStyle]="{ 'background-color': pokemon.id % 2 !== 0 ? '#d4d4d4' : '#c9c9c9' }">
              <button mat-icon-button color="primary"
                style="margin-left: 5%; background-color: #57995a; border-radius: 8px;" (click)="editarPokemon(pokemon)">
                <mat-icon style="color: white; background-color: #57995a;">edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" style="margin-left: 5%; background-color: #af2945; border-radius: 8px;"
                (click)="eliminarPokemon(pokemon)">
                <mat-icon style="color: white; background-color: #af2945;">delete</mat-icon>
              </button>
            </td>
          </ng-container>
    
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    
        <mat-paginator style="background-color: #2e4766; color: white; border-radius: 8px; font-size: 14px; margin-top: 2%;"
          [pageSizeOptions]="[ 20, 50, 100]" showFirstLastButtons></mat-paginator>
      </mat-card-content>
    </mat-card>


Con esto finalizamos la creación y distribución inicial de los componentes de nuestro  proyecto, concluido este paso nuestro proyecto se vera de la siguiente forma:

Estructura del Proyecto Login con Componentes Incorporados
![image](https://github.com/user-attachments/assets/1ae38a9d-5c70-4a5e-9b37-7ec5fa5ffdd4)

Vista Login
![image](https://github.com/user-attachments/assets/9c91c997-5f97-4dbc-8e4e-925e84ac2f9a)

Vista Home

![image](https://github.com/user-attachments/assets/7d76da54-7a5b-455c-838c-af755b497006)


Hasta al momento aun no se recuperan dentro del proyecto los usuarios ni los datos de los pokemons proporcionados por la API, por lo que en la seccion home aun no se muestra informacion relevante
Para continuar con el desarrollo de la practica es necesaria la configuración del servicio para el consumo de la API como se detalla mas adelante

### 2.-Generación de los Servicios para  el Consumo de las API(s)
Para iniciar el consumo de API externas es necesarios la configuración de servicios dentro de nuestro proyecto a traves de los cuales se pueda accesar a la API y recupear su contenido a traves de un JSON.

Por ello dentro del proyecto se debe generar servicios que se encargue de consumir la API Web de usuarios y la API de pokemos; para ello en la terminal debemos escribir los siguientes comandos para la generacion de los servicios: 

    • ng generate service services/user
    • ng generate service services/pokemon|

![image](https://github.com/user-attachments/assets/e89840f4-ade4-45df-9809-fccadcbc0138)

Generación de los Servicios

### 3.- Configurar Modelo de Servicio (HttpCLienteModule)
Para permitir el acceeso del servicio dentro de los compoentes de nuestro proyecto es necesario configurar las importaciones y rutas necesarias dentro del modulo de nuestro aplicacion, debemos asegurarnos de importar la libreria HttpClienteModule y definir a ruta a nuestros servicios con las instrucciónes import { UserService } from './services/user.service', import { PokemonService } from './services/pokemon.service . Para confiugrar la paginación en nuestra proyecto será necesario contemplar la importación de la libreria NgxPaginationModule

Condigo de Configuración de Acceso al Servicio

    import { UserService } from './services/user.service';
    import { PokemonService } from './services/pokemon.service';
    import { NgxPaginationModule } from 'ngx-pagination';
    
    
    imports: [
    HttpClientModule, NgxPaginationModule
    ],

Las importaciones se realizaran en los archivos pokemons-lista.component.ts, home.component.ts y login.commponent.ts

![image](https://github.com/user-attachments/assets/592f39f2-6203-41e7-b00a-66fe8f83304f)

Ejemplo de Configuración

### 4.- Actualización de TypeSccript del Componente usuarios-lista para la Presentación de la API
Finalizada la creación del componente debemos dirigirnos al archivo pokemon-lista.component.ts para cconfigurar la logica de acceso al servicio del consumo de la API Pokemons y el como se reccorrera el JSON de datos para su presentación en el HTML.

Para esto dentro del archivo usuarios-lista.component.ts copiamos el siguiente código:

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
      templateUrl: './pokemon-lista.component.html',
      styleUrls: ['pokemon-lista.component.css'],
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

Dentro del archivo se contemplan las siguientes funciona para admitir operaciones de edicion y filtrado sobre la tabla de datos.

Metodo verDetalles para consultar la información especifica de un pokemon en un card independiente

     verDetalles(pokemon: Pokemon): void {
        this.dialog.open(PokemonDetailsComponent, {
          data: pokemon,
          width: '400px',
        });
      }


Para trabajar con esta funcion debemos crar el componente pokemon-detalles.component para desplegar en card independiente la informacion del pokemon selecccionado

Código componente pokemon-detalles.component.ts

    import { Component, Inject } from '@angular/core';
    import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
    import { Pokemon } from '../components/pokemons-lista/pokemon.interface';
    import { MatIcon } from '@angular/material/icon';
    
    @Component({
      selector: 'app-pokemon-details',
      standalone: true,
      imports: [MatIcon],
      template: `
        <div class="dialog-header">
          <h1>Detalles de {{ data.nombre }}</h1>
          <button mat-icon-button (click)="onClose()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <div mat-dialog-content class="dialog-content">
          <img [src]="data.imagen" alt="{{ data.nombre }}" />
          <p><strong>ID:</strong> {{ data.id }}</p>
          <p><strong>Nombre:</strong> {{ data.nombre }}</p>
          <p><strong>Habilidades:</strong> {{ data.habilidades }}</p>
          <p><strong>Tipo:</strong> {{ data.tipo }}</p>
          <p><strong>Generacion:</strong> {{ data.generacion }}</p>
        </div>
        <div mat-dialog-actions>
          <button mat-raised-button style="color:white; font-family: Cascadia Code; background-color: #cd7600; border-color: #cd7600; border-radius: 6px; height: 40px;  width: 120px; margin-top: 2%; margin-left: 2%; margin-bottom: 3%;" (click)="onClose()">Cerrar</button>
        </div>
      `,
      styleUrls: ['pokemon-detalles.component.css'],
    })
    export class PokemonDetailsComponent {
      constructor(
        @Inject(MAT_DIALOG_DATA) public data: Pokemon,
        private dialogRef: MatDialogRef<PokemonDetailsComponent>
      ) {}
    
      onClose(): void {
        this.dialogRef.close();
      }
    }


Metodo editar Pokemon
Este metodo permite la edicion de información de la data de la tabla de consulta Pokemons, presenta los inputs de registro del pokemon seleccionado  con su informacion actual en una ventada idependiente. Admite el guardado o cancelación de la informacion ingresada en los input.

Codigo función editarPokemon

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

Para trabjar esta funcion nuevamente debemos crear un componente independiente que maneje la logia de presentacion y guardado de la informacion del pokemon seleccionado por ello debemos generar un nuevo componente llamado  pokemon-edit; dentro del componente pokemon-edit.component.ts pegaremos el siguiente codigo para presentar la informacion de un pokemon seleccionado en un input editable.

Código pokemon-edit.component.ts

    import { Component, Inject } from '@angular/core';
    import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
    import { MatFormFieldModule } from '@angular/material/form-field';
    import { MatInputModule } from '@angular/material/input';
    import { MatDialogModule } from '@angular/material/dialog';
    import { FormsModule } from '@angular/forms';
    import { NgIf } from '@angular/common';
    import { MatIcon } from '@angular/material/icon';
    import { Pokemon } from '../pokemons-lista/pokemon.interface';
    
    @Component({
      selector: 'app-pokemon-edit',
      standalone: true,
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
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
          <mat-form-field appearance="fill" style="width: 100%;">
            <mat-label style="font-family: Cascadia Code;">Region</mat-label>
            <input style="font-family: Cascadia Code;" matInput [(ngModel)]="data.generacion" />
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

Metodo para la eliminación de registros Pokemons


### 5.- Modificacion del Archivo de Vista (html) del Componente pokemon-lista para la Presentación de la API
Terminada la modificacion del archivo TypeScript para la recuperacion de los datos debemos proceder a la edicion del archivo usuarios-lista.component.html para inidicarle a la apliacion el como deseamos presentar nuestros datos. Para este ejemplos los datos serán presetado mediante una tabla basica donde se almacene el id, nombre, correo y rol de cada registro devuelto en el JSON.

Para ello abimos el archivo Abrir src/app/usuarios-lista/usuarios-lista.component.html y agregaamos el
siguiente código para crear una tabla donde se mostrarán los datos de los usuarios

    <mat-card style="border-radius: 0px; background-color: #212830; width: 1150px;">
      <mat-card-header style="background-color: #407160d5; border-radius: 3px;">
        <mat-card-title>Usuarios Consumo API</mat-card-title>
      </mat-card-header>
    
      <mat-card-content style="background-color: #f2f2f2; border-radius: 4px;">
        <table mat-table [dataSource]="dataSource">
    
          <ng-container matColumnDef="nombre">
            <th mat-header-cell *matHeaderCellDef> Nombre </th>
            <td mat-cell *matCellDef="let user"> 
              {{ user.name?.firstname }} {{ user.name?.lastname }}  
            </td>
          </ng-container>
    
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef> Correo </th>
            <td mat-cell *matCellDef="let user"> {{ user.email }} </td>
          </ng-container>
    
          <ng-container matColumnDef="telefono">
            <th mat-header-cell *matHeaderCellDef> Teléfono </th>
            <td mat-cell *matCellDef="let user"> {{ user.phone }} </td>
          </ng-container>
    
          <ng-container matColumnDef="direccion">
            <th mat-header-cell *matHeaderCellDef> Dirección </th>
            <td mat-cell *matCellDef="let user"> 
              {{ user.address ? user.address.street : 'No disponible' }} 
            </td>
          </ng-container>
    
          <ng-container matColumnDef="contraseñas">
            <th mat-header-cell *matHeaderCellDef> Contraseña </th>
            <td mat-cell *matCellDef="let user"> {{ user.password }} </td>
          </ng-container>
    
          <ng-container matColumnDef="Imagen">
            <th mat-header-cell *matHeaderCellDef> Usuario </th>
            <td mat-cell *matCellDef="let user; let i = index">
              <!-- Alternar imagen basado en el índice -->
              <img 
                [src]="i % 2 === 0 ? '/assets/user2.png' : '/assets/image.png'" 
                alt="Imagen de usuario" 
                style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;" />
            </td>
          </ng-container>
    
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    
        <!-- Paginador -->
        <mat-paginator style="background-color: #407160d5; color: black; border-radius: 8px; font-size: 14px;" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
      </mat-card-content>
    </mat-card>

Ejemplo Modificación del Archivo HTML

### 7.- Integración del Component en la Apliacion
Por ultimo cuando se termina la configuración del consumo y presentación del contenido de la API el ultimo paso será definir las ruta de acceso a los compoente dentro del arhivo src/app/app.module.ts agregando las importaciónes

como se muestra en el siguiente código:

    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';
    import { LoginModule } from './login/login.module';
    import { HomeModule } from './home/home.module';
    import { HeaderComponent } from './header/header.component';
    import { MenuComponent } from './menu/menu.component';
    import { FooterComponent } from './footer/footer.component';
    
    @NgModule({
      declarations: [],
      imports: [
        CommonModule,FormsModule, LoginModule, HomeModule, HeaderComponent, MenuComponent, FooterComponent
      ]
    })
    export class AppModule { }
    

    import { UserListComponent } from './user-list/user-list.component';

Configurada el manejo de las rutas a nuestros compoenente nos dirijimos a nuestro archivo src/app.routes.ts y dentro del el configuramos las rutas reconocidas por nuestra aplicacion, esto para mostrar como pagina principal el componente login y permitir el redireccionamiento al componente home en caso que el usuario ingresado sea valido.

Codigo de manejo de rutas:

    import { Routes } from '@angular/router';
    import { LoginComponent } from './login/login.component';
    import { HomeComponent } from './home/home.component';
    import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component'; // Asegúrate de importar correctamente
    
    export const routes: Routes = [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, 
      { path: 'login', component: LoginComponent },
      {
        path: 'home',
        component: HomeComponent,
        children: [
          { path: '', component: HomeComponent }
        ]
      },
    
    ];

![image](https://github.com/user-attachments/assets/3bc3cbdd-7d8c-4745-a9a8-cfffa74e3828)
Manejo de rutas

Por ultimo para que nuestro proyecto cargue de manera correcta el formulario de login al ejecuttarse dentro del archivo app.component.html agregamos el siguiente código, para que el login sea cargado como componente principal

Instrucción de incorporacion:

    <main class="main">
      <router-outlet></router-outlet> 
    </main>

![image](https://github.com/user-attachments/assets/3f85af61-bd98-4893-9c3a-7c857db093ec)


Ejemplo de Incorporación del login a la Ejecución Base

### 8.- Ejecución de la Aplicacion y Comporbación del Consumo de la API
Con esto hemos finalizado el desarrollo de la pracica; para verificar que hemos realizado correctamente el desarrollo de la aplicacion web dentro del login ingresaremos inicialmente un usario y contraseña aleatorio para verificar que la aplicaccion arroje el mensaje de alerta de usuario invalido si tratamos de loguearnos con un usuario no incluido en la api consultada.

Por ultimo intentaremos loguearno nuevamente con el usuario john@gmail.com  con constraseña 	m38rmF$ para validar que se nos redirecciones a la ruta home si el usuario es reconocido como un usuario valido para la API consultada.

Comando de ejecución:
    
    ng serve 

![image](https://github.com/user-attachments/assets/d2765f18-db84-4e16-ad33-b77f3b7c2a5f)


![image](https://github.com/user-attachments/assets/c6948544-2e6c-456e-b33d-36fbca90af72)

Ejecución de la Apliacion con Usuario Invalido

![image](https://github.com/user-attachments/assets/5bbee50b-c7a0-46ed-9048-bf1a4da2818e)

![image](https://github.com/user-attachments/assets/4c843c82-0e05-4c9b-91df-49bd40538a73)

Ejecucución de la Aplicación con Usuario Valido

# Resultado Final del Consumo de la API
![image](https://github.com/user-attachments/assets/fea019e4-2ff5-496a-a96b-3535b348dc37)






