import { Component, Input, ElementRef, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';
import { flyInOut, fadeInOut } from '../../animations';
import { TooltipPosition, ElementCoordinate } from './tooltip.model';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    animations: [
        flyInOut,
        fadeInOut
    ]
})
export class TooltipComponent implements AfterViewInit, AfterViewChecked {

    @Input() placement: 'above' | 'below' | 'right' = 'below';
    @Input() alignment: 'left' | 'center' | 'right' = 'left';
    @Input() hostElement: HTMLElement;
    @Input() content: string;
    @Input() title: string;
    @Input() alignTitle: 'center' | 'left' = 'center';
    @Input() fixedWidth = true;
    @Input() hasHTMLContent = false;
    @Input() size: string;
    @Input() display = true;
    @ViewChild('tooltipDiv') tooltipDiv: ElementRef;
    @ViewChild('tooltipArrow') tooltipArrow: ElementRef;

    public visible = false;

    private tooltipPosition: TooltipPosition;

    private ARROW_SIZE = 16;
    private ARROW_RADIUS = 12;
    private ALIGNMENT_PADDING = 10;

    constructor(
        public element: ElementRef
    ) { }

    ngAfterViewInit() {
        this.tooltipPosition = this.calculateTooltipPosition();
    }

    ngAfterViewChecked() {
        this.setTooltipPosition();
    }

    show() {
        if (!this.hostElement) {
            return;
        }
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    private calculateTooltipPosition(): TooltipPosition {
      const hostElementCoordinate = this.getElementCoordinate(this.hostElement);
      const tooltipDivSize = this.elementSize(this.tooltipDiv.nativeElement);
      const tooltipArrowSize = this.elementSize(this.tooltipArrow.nativeElement);

      switch (this.placement) {
        case 'above':
          return this.calculateAbovePlacement(hostElementCoordinate, tooltipDivSize, tooltipArrowSize);
        case 'below':
          return this.calculateBelowPlacement(hostElementCoordinate, tooltipDivSize, tooltipArrowSize);
        case 'right':
          return this.calculateRightPlacement(hostElementCoordinate, tooltipDivSize, tooltipArrowSize);
        default:
          return this.calculateAbovePlacement(hostElementCoordinate, tooltipDivSize, tooltipArrowSize);
      }
    }

    getElementCoordinate(nativeElement: HTMLElement): ElementCoordinate {
        let offsetParentBCR = new ElementCoordinate();
        const elBCR = this.offset(nativeElement);
        const offsetParentEl = this.parentOffsetEl(nativeElement);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        const boundingClientRect = nativeElement.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeElement.offsetWidth,
            height: boundingClientRect.height || nativeElement.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }

    private offset(nativeEl: any): ElementCoordinate {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: nativeEl.offsetWidth,
            height: nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    }

    private parentOffsetEl(nativeEl: HTMLElement): any {
        let offsetParent: any = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }

    private elementSize(nativeElement: HTMLElement): ElementCoordinate {
        const boundingClientRect = nativeElement.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeElement.offsetWidth,
            height: boundingClientRect.height || nativeElement.offsetHeight,
        };
    }

    private calculateAbovePlacement(hostElementCoordinate: ElementCoordinate, tooltipDivSize: ElementCoordinate, tooltipArrowSize: ElementCoordinate): TooltipPosition {
      const tooltipPosition = new TooltipPosition();
      tooltipPosition.arrowTop -= this.ARROW_SIZE;
      tooltipPosition.elementTop -= (this.ARROW_SIZE + tooltipDivSize.height);
      this.fillLeftPositionForAboveAndBelowPlacements(tooltipPosition, hostElementCoordinate, tooltipDivSize, tooltipArrowSize);

      return tooltipPosition;
    }

    private calculateBelowPlacement(hostElementCoordinate: ElementCoordinate, tooltipDivSize: ElementCoordinate, tooltipArrowSize: ElementCoordinate): TooltipPosition {
      const tooltipPosition = new TooltipPosition();
      tooltipPosition.arrowTop += (hostElementCoordinate.height - this.ARROW_RADIUS);
      tooltipPosition.elementTop += (tooltipPosition.arrowTop + (this.ARROW_RADIUS + this.ARROW_SIZE));
      this.fillLeftPositionForAboveAndBelowPlacements(tooltipPosition, hostElementCoordinate, tooltipDivSize, tooltipArrowSize);

      return tooltipPosition;
    }

    private fillLeftPositionForAboveAndBelowPlacements(tooltipPosition: TooltipPosition, hostElementCoordinate: ElementCoordinate, tooltipDivSize: ElementCoordinate, tooltipArrowSize: ElementCoordinate): void {
      tooltipPosition.arrowLeft -= (this.ARROW_RADIUS - (hostElementCoordinate.width / 2));
      switch (this.alignment) {
        case 'center':
          tooltipPosition.elementLeft -= (tooltipDivSize.width / 2 - (hostElementCoordinate.width / 2));
          break;
        case 'right':
          tooltipPosition.elementLeft -= ((tooltipDivSize.width - tooltipPosition.arrowLeft) - ((2 * this.ARROW_RADIUS) + this.ALIGNMENT_PADDING));
          break;
        default: // 'left'
          tooltipPosition.elementLeft -= (-tooltipPosition.arrowLeft + this.ALIGNMENT_PADDING);
          break;
      }
    }

    private calculateRightPlacement(hostElementCoordinate: ElementCoordinate, tooltipDivSize: ElementCoordinate, tooltipArrowSize: ElementCoordinate): TooltipPosition {
      const tooltipPosition = new TooltipPosition();
      tooltipPosition.arrowLeft += (hostElementCoordinate.width - this.ARROW_RADIUS);
      tooltipPosition.elementLeft += (tooltipPosition.arrowLeft + (this.ARROW_RADIUS + this.ARROW_SIZE));
      this.fillTopPositionForRightAndLeftPlacements(tooltipPosition, hostElementCoordinate, tooltipDivSize, tooltipArrowSize);

      return tooltipPosition;
    }

    private fillTopPositionForRightAndLeftPlacements(tooltipPosition: TooltipPosition, hostElementCoordinate: ElementCoordinate, tooltipDivSize: ElementCoordinate, tooltipArrowSize: ElementCoordinate): void {
      tooltipPosition.arrowTop -= (this.ARROW_RADIUS - (hostElementCoordinate.height / 2));
      tooltipPosition.elementTop -= (tooltipDivSize.height / 2 - (hostElementCoordinate.height / 2));
    }

    private setTooltipPosition() {
      if (this.tooltipDiv && this.tooltipPosition) {
        if (this.tooltipPosition.elementTop != null) {
          this.tooltipDiv.nativeElement.style.top = this.tooltipPosition.elementTop + 'px';
        }
        if (this.tooltipPosition.elementLeft != null) {
          this.tooltipDiv.nativeElement.style.left = this.tooltipPosition.elementLeft + 'px';
        }
        if (this.tooltipPosition.arrowTop != null) {
          this.tooltipArrow.nativeElement.style.top = this.tooltipPosition.arrowTop + 'px';
        }
        if (this.tooltipPosition.arrowLeft != null) {
          this.tooltipArrow.nativeElement.style.left = this.tooltipPosition.arrowLeft + 'px';
        }
      }
    }
}
