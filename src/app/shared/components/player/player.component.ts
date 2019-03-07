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
  @Output() setPlay = new EventEmitter<number>();
  @Output() setPause = new EventEmitter<number>();
  @Output() setStop = new EventEmitter<number>();
  @Output() setRestart = new EventEmitter<number>();

  statusTypes = { begin: 0, run: 1, pause: 2, end:3 };
  status: number = 0;

  constructor() { }

  ngOnInit() {
  }

  play() {
    this.status = this.statusTypes.run;
    this.setPlay.emit(this.statusTypes.run);
  }

  stop() {
    this.status = this.statusTypes.end;
    this.setStop.emit(this.statusTypes.end);
  }

  pause() {
    this.status = this.statusTypes.pause;
    this.setPause.emit(this.statusTypes.pause);
  }

  restart() {
    this.status = this.statusTypes.begin;
    this.setPlay.emit(this.statusTypes.begin);
  }

  backward() {
    const i = --this.index; 
    this.goBackward.emit(i);
  }

  forward() {
    const i = ++this.index; 
    this.goForward.emit(i);
  }
}
