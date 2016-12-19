import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ICounter } from '../../store';

@Component({
  selector: 'rio-counter',
  template: `
    <div class="flex">
      <rio-button
      featureId="id1"
      className="bg-black col-2"
      (onClick)="decrement.emit()"
      testid="counter-decrementButton">
      -
      </rio-button>

      <div
      data-testid="counter-result"
      class="flex-auto flex-center center h1">
      {{ counter.counter }}
      </div>

      <rio-button className="col-2"
      featureId="id2"
      (onClick)="increment.emit()"
      testid="counter-incrementButton">
      +
      </rio-button>
    </div>

    <div class="flex">

      <label class="switch">
        <input type="checkbox"
        id="toggle-decrementButton"
        (change)=decrementBtnOnChange($event)>

        <div class="slider round"></div>
      </label>

      <div class="flex-auto flex-center"></div>

      <label class="switch">
        <input type="checkbox"
        id="toggle-incrementButton"
        (change)=incrementBtnOnChange($event)>

        <div class="slider round"></div>
      </label>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RioCounter {
  @Input() counter: ICounter;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() toggleFeatureVisibility = new EventEmitter<any>();

  private incrementBtnOnChange(event) {
    this.toggleFeatureVisibility.emit({
      id: 'id1',
      visible: event.target.checked
    });
  }

  private decrementBtnOnChange(event) {
    this.toggleFeatureVisibility.emit({
      id: 'id2',
      visible: event.target.checked
    });
  }
};
