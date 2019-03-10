import { Component, OnInit } from '@angular/core';

import { JogoApiService } from 'src/app/shared/services/jogo-api.service';
import { Main } from 'src/app/models/main';

@Component({
    template: '',
    selector: 'app-base-jogos'
})
export class BaseJogos implements OnInit {

  logicas: Main.Logica[];
  
  constructor(public jogoApiService: JogoApiService) { }

  ngOnInit() {
    this.jogoApiService.obterLogicas().subscribe(logicas => {
      
    });
  }

}
