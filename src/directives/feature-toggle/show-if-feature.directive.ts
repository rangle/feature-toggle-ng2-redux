import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';

@Directive({
  selector: `[showIfFeature]`,
})
export class ShowIfFeatureDirective implements OnInit {
  @Input() set showIfFeature(id: string) {
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

    const unsubscribe = this.ngRedux.subscribe(() => {
      this.toggleFeature();
    });
    // unsubscribe();
  }

  private createView() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearViewContainer() {
    this.viewContainer.clear();
    this.view = null;
  }

  private toggleFeature() {
    const state = this.ngRedux.getState();
    const isEnabled = state.toggles[this.id];

    // show component if it's currently hidden and toggle is on
    if (isEnabled && this.view === null) {
      this.createView();
    } else if (!isEnabled && this.view !== null) {
      this.clearViewContainer();
    }
  }
}
