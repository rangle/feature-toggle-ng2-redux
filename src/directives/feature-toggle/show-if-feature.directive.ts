import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { ToggleRouter } from '../../services/toggle-router';

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
    private toggleRouter: ToggleRouter) {}

  // This Directive subscribes toggle button event
  // to add/remove the corresponding element
  ngOnInit() {
    // first time without state change
    this.toggleFeature();
    this.toggleRouter.watch(this.id).subscribe( (newVal) => {
      this.toggleFeature();
    } );
  }

  private createView() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearViewContainer() {
    this.viewContainer.clear();
    this.view = null;
  }

  private toggleFeature() {
    const isEnabled = this.toggleRouter.isEnabled(this.id);

    // show component if it's currently hidden and toggle is on
    if (isEnabled && this.view === null) {
      this.createView();
    } else if (!isEnabled && this.view !== null) {
      this.clearViewContainer();
    }
  }
}
