import {
  Component,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputActions } from '../../actions';

@Component({
  selector: 'rio-input',
  providers: [InputActions],
  template: `
    <input
      [id]="qaid"
      [name]="name"
      [type]="inputType"
      class="block col-12 mb1 input"
      [attr.placeholder]="placeholder"
      [formControl]="control"
      (focus)="actions.startEditing(name)"
      (blur)="actions.finishEditing(name, control.status, control.error)"
    />
  `
})
export class RioInput {
  @Input() inputType = 'text';
  @Input() placeholder = '';
  @Input() control: FormControl = new FormControl();
  @Input() qaid: string;
  @Input() name: string = '';

  constructor(private actions: InputActions) {}
};
