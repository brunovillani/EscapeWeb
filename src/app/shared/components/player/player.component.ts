import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  tiposComandos = { 0: 'stop', 1: 'play', 2: 'pause', 3: 'back', 4: 'forward', 5: 'reset' };
  tiposStatus = { 0: 'parado', 1: 'jogando', 2: 'em pausa' };
  
  status: string;

  constructor() { }

  ngOnInit() {
  }

  playPause() {
    if (this.status !== this.tiposStatus[1]) {
      this.status = this.tiposStatus[1];
    } else {
      this.status = this.tiposStatus[2];
    }
  }

  stop() {
    
  }

  back() {

  }

  forward() {

  }
}
