import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';

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
    private ngRedux: NgRedux<IAppState>,
    private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const state = this.ngRedux.getState().toggles;

    // update toggle buttons with the intial state
    if (state[this.matchFeatureId]) {
      this.toggleButton.nativeElement.setAttribute('checked', 'checked');
    }
  }

  toggleHandler(event) {
    this.onToggle.emit(event);
  }
};
