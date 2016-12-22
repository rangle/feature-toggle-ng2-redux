import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';

@Directive({
  selector: `[featureId]`,
})
export class FeatureToggleDirective implements OnInit {
  @Input() set featureId(id: string) {
    this.id = id;
  }

  id: string;
  view: any = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private ngRedux: NgRedux<IAppState>) {}

  // This Directive subscribes toggle button event
  // to add/remove the corresponding element
  ngOnInit() {
    // first time without state change
    this.toggleFeature();

    let unsubscribe = this.ngRedux.subscribe(() => {
      this.toggleFeature();
    });
    // unsubscribe();
  }

  private toggleFeature() {
    let state = this.ngRedux.getState().toggles;
    let nextVisibility = state[this.id];

    if (nextVisibility && this.view === null) {
      this.view = this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!nextVisibility && this.view !== null) {
      this.viewContainer.clear();
      this.view = null;
    }
  }

}
