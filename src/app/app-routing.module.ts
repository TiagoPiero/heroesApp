import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import ('./heroes/heroes.module').then( m => m.HeroesModule)
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'     // esto se hace para que el path sea exactamente vacio. Si no se pone, puee entrar en cualq ruta ya que en cualquier path siempre hay un string vacio antes de la primera letra
  },
  {
    path: '**',
    redirectTo: '404'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
