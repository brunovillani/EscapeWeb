import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedService } from '../../shared/services/shared.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  public menuAberto = true;
  public backdrop = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private sharedService: SharedService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.sharedService.sidenav.open.subscribe(open => {
        this.menuAberto = open;
      }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public toggleOpen(): void {
    this.menuAberto = !this.menuAberto;
    this.backdrop = true;
  }

  public onClose(): void {
    this.backdrop = false;
  }
}
