import { OnChanges } from '@angular/core';
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-icon',
  template: `<mat-icon
    class="icon icon--{{ svgIcon }} icon--{{ iconClass }} icon--{{ iconColor }} icon--border-color-{{ iconBorderColor }}"
    svgIcon="{{ svgIcon }}"></mat-icon>
  `,
  styles: [
    ':host { display: inline-block; vertical-align: middle; line-height: 0; }'
  ]
})
export class IconComponent implements OnChanges {
  @Input() svgIcon: string;
  @Input() iconColor = 'default';
  @Input() iconBorderColor = 'default';
  @Input() iconClass = 'default';

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.iconRegistry.addSvgIcon(
      this.svgIcon,
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.svgIcon + '.svg')
    );
  }
}
