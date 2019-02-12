import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MessageService } from './message.service';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home';
import { PageNotFoundComponent } from './page-not-found';
import { SidenavComponent } from './sidenav';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    SidenavComponent
  ],
  exports: [
    HomeComponent,
    PageNotFoundComponent,
    SidenavComponent
  ],
  providers: [
    MessageService
  ]
})
export class CoreModule {
}
