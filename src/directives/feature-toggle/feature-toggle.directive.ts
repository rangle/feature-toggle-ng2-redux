import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';

@Directive({
  selector: `[featureId]`,
})
export class FeatureToggleDirective implements OnInit {
  @Input('featureId') featureToggleId: string;

  constructor(
    private elementRef: ElementRef,
    private ngRedux: NgRedux<IAppState>) {}

  // This Directive subscribes toggle button event
  // to add/remove the corresponding element
  ngOnInit() {
    var unsubscribe = this.ngRedux.subscribe(() => {
      let state = this.ngRedux.getState();
      this.toggleFeature(state.toggles);
      console.log('subscribe', state);
    });
    // unsubscribe();
  }

  private toggleFeature(event) {
    console.log('toggling', event);
  }
}
