import { Component, OnInit } from '@angular/core';

import { BaseJogos } from '../shared/base-jogos.component';
import { JogoApiService } from 'src/app/shared/services/jogo-api.service';

@Component({
  selector: 'app-taca',
  templateUrl: './taca.component.html',
  styleUrls: ['./taca.component.scss']
})
export class TacaComponent extends BaseJogos implements OnInit {

  constructor(jogoApiService: JogoApiService) {
    super(jogoApiService);
  }

  ngOnInit() {
    this.logicas.pop();
  }

}
