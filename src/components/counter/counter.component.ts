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
      *hideIfFeature="feature1"
      className="bg-green col-2"
      (onClick)="decrement.emit()"
      testid="counter-decrementButton">
      -
      </rio-button>

      <rio-button
      *showIfFeature="feature1"
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
      *showIfFeature="feature2"
      (onClick)="increment.emit()"
      testid="counter-incrementButton">
      +
      </rio-button>
    </div>

    <div class="flex">
      <rio-toggle
        [matchFeatureId]="feature1"
        (onToggle)="decrementBtnOnChange($event)">
      </rio-toggle>

      <div class="flex-auto flex-center"></div>

      <rio-toggle
        [matchFeatureId]="feature2"
        (onToggle)="incrementBtnOnChange($event)">
      </rio-toggle>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RioCounter {
  @Input() counter: ICounter;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() onToggle = new EventEmitter<any>();

  feature1: string = 'feature1';
  feature2: string = 'feature2';

  private decrementBtnOnChange(event) {
    this.onToggle.emit({
      [this.feature1]: event.target.checked
    });
  }

  private incrementBtnOnChange(event) {
    this.onToggle.emit({
      [this.feature2]: event.target.checked
    });
  }
};
