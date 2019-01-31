import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../shared/components/base.component';
import { MessageService } from '../core/message.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.scss']
})
export class JogosComponent extends BaseComponent implements OnInit {

  aberto: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private sharedService: SharedService
  ) { 
    super(messageService)
  }

  ngOnInit() {
    
  }

  toggleMenu() {
    this.aberto = !this.aberto;
    this.sharedService.sidenav.open.next(this.aberto);
  }

  abrirSantosDumont() {
    this.router.navigate(['santos-dumont'], { relativeTo: this.route });
  }

  abrirTaca() {
    this.router.navigate(['taca'], { relativeTo: this.route });
  }
}
