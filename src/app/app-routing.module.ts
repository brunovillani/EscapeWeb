import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', pathMatch: 'full', component: HomeComponent, },
    { path: 'jogos', loadChildren: './jogos/jogos.module#JogosModule', },
    { path: '**', component: PageNotFoundComponent, },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
