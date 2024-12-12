import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component';
import { ComidasListaComponent } from './components/comidas-lista/comidas-lista.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosListaComponent },
  { path: 'comidas', component: ComidasListaComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },

];


