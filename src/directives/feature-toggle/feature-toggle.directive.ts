import {
  Directive,
  Input,
  OnInit,
  AfterViewInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';

@Directive({
  selector: `[featureid]`,
})
export class FeatureToggleDirective implements OnInit, AfterViewInit {
  @Input() set featureid(id: string) {
    this.id = id;
  }

  id: string;
  view: any = null;
  hideFeature: boolean = false;

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

  ngAfterViewInit() {
    const target = this.templateRef.elementRef.nativeElement.nextElementSibling;
    if (target) {
      this.hideFeature = target.hasAttribute('hide-feature');
    }

    this.toggleFeature();
  }

  private createView() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearViewContainer() {
    this.viewContainer.clear();
    this.view = null;
  }

  private toggleFeature() {
    const state = this.ngRedux.getState().toggles[this.id];
    const nextVisibility = state.isEnabled;

    // show component if it's currently hidden and toggle is on
    // if (nextVisibility && this.view === null) {
    //   if (!this.hideFeature) {
    //     this.createView();
    //   }
    // } else if (!nextVisibility && this.view !== null) {
    //   this.clearViewContainer();
    // }

    if (nextVisibility) {
      if (this.view === null) {
        if (!this.hideFeature) {
          this.createView();
        }
      } else {
        if (this.hideFeature) {
          this.clearViewContainer();
        }
      }
    } else {
      if (this.view === null) {
        if (this.hideFeature) {
          this.createView();
        }
      } else {
        if (!this.hideFeature) {
          this.clearViewContainer();
        }
      }
    }

  }
}
