import { Component, OnInit } from '@angular/core';
import { BaseJogos } from '../shared/base-jogos.component';
import { JogoApiService } from 'src/app/shared/services/jogo-api.service';

@Component({
  selector: 'app-santos-dumont',
  templateUrl: './santos-dumont.component.html',
  styleUrls: ['./santos-dumont.component.scss']
})
export class SantosDumontComponent extends BaseJogos implements OnInit {

  gameIndex = 0;
  
  constructor(jogoApiService: JogoApiService) {
    super(jogoApiService);
  }

  ngOnInit() {
  }

  goForward() {
    this.jogoApiService.forward().subscribe((comando) => {
      this.gameIndex++;
    });
  }

  goBackward() {
    this.jogoApiService.backward().subscribe((comando) => {
      this.gameIndex--;
    });
  }

}
