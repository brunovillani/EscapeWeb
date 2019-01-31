import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InlineMenuOption } from './inline-menu-option.model';

@Component({
  selector: 'app-inline-menu',
  templateUrl: './inline-menu.component.html',
  styleUrls: ['./inline-menu.component.scss']
})
export class InlineMenuComponent implements OnInit {
  @Input() options: InlineMenuOption[] = [];
  @Input() selectedIndex = 0;
  @Input() condensed = false;
  @Input() whiteSpaceNormal = false;
  @Output() selectedIndexChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  optionSelected(index: number) {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(this.selectedIndex);
  }
}
