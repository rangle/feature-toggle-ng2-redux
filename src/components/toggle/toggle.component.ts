import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { ToggleRouter } from '../../services/toggle-router';

@Component({
  selector: 'rio-toggle',
  template: `
    <label class="switch">
      <input
        #toggleButton
        type="checkbox"
        (change)=toggleHandler($event)>
      <div class="slider round"></div>
    </label>
  `
})
export class RioToggle implements AfterViewInit {
  @Input() matchFeatureId: string;
  @Output() onToggle = new EventEmitter<any>();
  @ViewChild('toggleButton') toggleButton: ElementRef;
  constructor(
    private toggleRouter: ToggleRouter ) {}

  ngAfterViewInit() {

    // update toggle buttons with the intial state
    if (this.toggleRouter.isEnabled(this.matchFeatureId)) {
      this.toggleButton.nativeElement.setAttribute('checked', 'checked');
    }
  }

  toggleHandler(event) {
    this.onToggle.emit(event);
  }
};
