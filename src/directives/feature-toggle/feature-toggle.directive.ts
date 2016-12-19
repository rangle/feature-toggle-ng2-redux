import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: `[featureId]`,
})
export class FeatureToggleDirective implements OnInit {
    @Input('featureId') featureToggleId: string;


    constructor(private elementRef: ElementRef) {}
    ngOnInit() {
        this.toggleFeature();
    }

    private toggleFeature() {
        if (this.featureToggleId === 'id1')
            this.elementRef.nativeElement.style.display = 'none';
    }
}