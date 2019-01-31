import { Component, OnInit } from '@angular/core';
import { BaseJogos } from '../shared/base-jogos.component';
import { JogoApiService } from 'src/app/shared/services/jogo-api.service';

@Component({
  selector: 'app-santos-dumont',
  templateUrl: './santos-dumont.component.html',
  styleUrls: ['./santos-dumont.component.scss']
})
export class SantosDumontComponent extends BaseJogos implements OnInit {

  teste: any;
  
  constructor(jogoApiService: JogoApiService) {
    super(jogoApiService);
  }

  ngOnInit() {
    this.logicas.push({id: 6, concluida: false});
    this.jogoApiService.testeComm().subscribe(resposta => this.teste = resposta);
  }

}
