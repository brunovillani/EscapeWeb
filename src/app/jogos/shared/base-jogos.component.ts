import { Component, OnInit } from '@angular/core';

import { JogoApiService } from 'src/app/shared/services/jogo-api.service';

@Component({
    template: '',
    selector: 'app-base-jogos'
})
export class BaseJogos implements OnInit {

  logicas: {id: number, concluida: boolean}[] = [
      {id: 1, concluida: true},
      {id: 2, concluida: true},
      {id: 3, concluida: false},
      {id: 4, concluida: false},
      {id: 5, concluida: false},
  ]
  constructor(public jogoApiService: JogoApiService) { }

  ngOnInit() {
  }

}
