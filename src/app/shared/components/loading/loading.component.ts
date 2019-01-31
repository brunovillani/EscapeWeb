import { Component, OnInit, Input } from '@angular/core';
import { fadeInOut } from '../../animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class LoadingComponent implements OnInit {
  @Input() loading = false;
  @Input() inline = false;
  @Input() color = 'default';

  constructor() { }

  ngOnInit() {
  }

}
