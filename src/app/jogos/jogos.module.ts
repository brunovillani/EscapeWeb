import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { JogosRoutingModule } from "./jogos.routing";
import { SharedModule } from "../shared/shared.module";
import { JogosComponent } from "./jogos.component";
import { SantosDumontComponent } from "./santos-dumont/santos-dumont.component";
import { TacaComponent } from "./taca/taca.component";
import { BaseJogos } from "./shared/base-jogos.component";

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
