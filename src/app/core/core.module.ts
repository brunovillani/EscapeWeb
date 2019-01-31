import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { MessageService } from './message.service';
import { CommonModule } from '@angular/common';

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
export class CoreModule { }