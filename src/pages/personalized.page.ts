import {Component} from '@angular/core';
import { FeatureToggleActions} from '../actions';
import {IPInfo, IIPInfo} from '../services/ip-info';

@Component({
  selector: 'personalized-page',
  template: `
    <rio-container class="flex flex-column">
     <rio-call-to-action></rio-call-to-action>
     <div class="flex">
        <rio-label class="col-4">Mock IP:</rio-label>
        <select  class="col-4" (change)="onPreset()" [(ngModel)]="preset">
            <option value="129.42.38.1">129.42.38.1 (US)</option>
            <option value="124.16.31.150">124.16.31.150 (CN)</option>
            <option value="69.17.177.26">69.17.177.26 (CA)</option>
        </select>
       <rio-input  class="col-4" [(ngModel)]="ip"></rio-input>
     </div>
     <rio-button (click)="personalize()">Personalize</rio-button>
   </rio-container>
  `
})
export class RioPersonalizedPage {
  ip: string;
  preset: string;
  constructor(
    private featureToggleActions: FeatureToggleActions,
    private ipInfo : IPInfo
  ) {}

  private countryToCTA (countryCode : string) : string {
    switch (countryCode) {
      case 'CA':
        return 'contact';
      case 'US':
        return 'training';
      default:
        return 'download';
    }
  }

  onPreset() {
    this.ip = this.preset;
  }

  personalize() {
    this.ipInfo.getIPInfo(this.ip).subscribe( (ipData : IIPInfo) => {
        console.log('New IP Info:');
        console.log(ipData);
        this.featureToggleActions.toggleFeatureSetting({cta: this.countryToCTA(ipData.countryCode)});
      },
      errors => {
        console.log(errors)
      }
    );
  }
}
