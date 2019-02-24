import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() index: number = 0;
  @Input() maxIndex: number;
  @Output() goForward = new EventEmitter<number>();
  @Output() goBackward = new EventEmitter<number>();

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

  goBack() {
    const i = --this.index; 
    this.goBackward.emit(i);
  }

  goFor() {
    const i = ++this.index; 
    this.goBackward.emit(i);
  }
}
