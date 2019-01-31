import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BaseComponent } from './components/base.component';
import { FilterComponent } from './components/filter/filter.component';
import { IconComponent } from './components/icon.component';
import { InlineMenuComponent } from './components/inline-menu/inline-menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from './modules/material/material.module';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { TooltipModule } from './modules/tooltip/tooltip.module';
import { JogoApiService } from './services/jogo-api.service';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    TooltipModule
  ],
  declarations: [
    BaseComponent,
    FilterComponent,
    IconComponent,
    InlineMenuComponent,
    LoadingComponent,
    MessageDialogComponent,
    PlayerComponent
  ],
  exports: [
    BaseComponent,
    CommonModule,
    FilterComponent,
    IconComponent,
    LoadingComponent,
    MaterialModule,
    TooltipModule,
    InlineMenuComponent,
    PlayerComponent
  ],
  providers: [
    JogoApiService,
  ],
  entryComponents: [
    MessageDialogComponent,
  ],
})

export class SharedModule { }
