import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JogosComponent } from './jogos.component';
import { SantosDumontComponent } from './santos-dumont/santos-dumont.component';
import { TacaComponent } from './taca/taca.component';

const jogosRoutes: Routes = [
  { path: '', component: JogosComponent, children: [
    { path: 'santos-dumont', component: SantosDumontComponent, data: { index: 0 } },
    { path: 'taca', component: TacaComponent, data: { index: 1 } },
    { path: '', pathMatch: 'full', redirectTo: 'torre-produtividade' }
  ] }
];

@NgModule({
  imports: [
      RouterModule.forChild(jogosRoutes)
  ],
  exports: [RouterModule]
})
export class JogosRoutingModule { }
