import { Directive, Input, HostListener, ElementRef, Renderer2,
    ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { TooltipComponent } from './tooltip.component';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective {
    @Input() tooltipPlacement: 'above' | 'below' | 'right' = 'above';
    @Input() tooltipAlignment: 'left' | 'center' | 'right' = 'left';
    @Input() tooltipTitle: string;
    @Input() tooltipContent: string;
    @Input() tooltipAlignTitle: 'center' | 'left' = 'center';
    @Input() tooltipFixedWidth = true;
    @Input() tooltipHasHTMLContent = false;
    @Input() tooltipSize: string;
    @Input() tooltipDisplay = true;

    private tooltip: ComponentRef<TooltipComponent>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        private element: ElementRef
    ) {
        element.nativeElement.style.position = 'relative';
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    show() {
        this.updateTooltip();
        this.tooltip.instance.show();
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    hide() {
        this.tooltip.instance.hide();
    }

    updateTooltip() {
        if (!this.tooltip) {
            const factory = this.resolver.resolveComponentFactory(TooltipComponent);
            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.renderer.appendChild(
               this.viewContainerRef.element.nativeElement,
               this.tooltip.injector.get(TooltipComponent).element.nativeElement
            );
            this.tooltip.instance.hostElement = this.element.nativeElement;
        }
        this.tooltip.instance.content = this.tooltipContent;
        this.tooltip.instance.hasHTMLContent = this.tooltipHasHTMLContent;
        this.tooltip.instance.title = this.tooltipTitle;
        this.tooltip.instance.placement = this.tooltipPlacement;
        this.tooltip.instance.alignment = this.tooltipAlignment;
        this.tooltip.instance.alignTitle = this.tooltipAlignTitle;
        this.tooltip.instance.fixedWidth = this.tooltipFixedWidth;
        this.tooltip.instance.size = this.tooltipSize;
        this.tooltip.instance.display = this.tooltipDisplay;
    }
}
