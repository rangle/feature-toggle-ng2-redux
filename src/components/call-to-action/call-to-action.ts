import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'rio-call-to-action',
  template: `
    <button
      [attr.data-testid]="testid"
      (click)="onClick($event)"
      type="button"
      class="btn btn-primary {{className}}">
      <div *showIfFeature="'cta===download'">
        Download Tutorial Now
      </div>
      <div *showIfFeature="'cta===contact'">
        Contact Us
      </div>
      <div *showIfFeature="'cta===training'">
        Sign Up for Training
      </div>
    </button>
  `
})
export class RioCallToAction {
  @Input() className: string;
  @Input() testid: string;
  @Input() disabled: boolean;

  @Output() click = new EventEmitter<MouseEvent>();

  private onClick(event: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }

    this.click.emit(event);
  }
}
