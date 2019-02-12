import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { JogosRoutingModule } from './jogos.routing';
import { SharedModule } from '../shared/shared.module';
import { JogosComponent } from './jogos.component';
import { BaseJogos } from './shared';
import { SantosDumontComponent } from './santos-dumont';
import { TacaComponent } from './taca';


@NgModule({
    imports: [
        JogosRoutingModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        JogosComponent,
        BaseJogos,
        SantosDumontComponent,
        TacaComponent
    ]
})
export class JogosModule { }
