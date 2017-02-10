import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Injectable()
export class FeatureToggleActions {
  static TOGGLE_FEATURE = 'TOGGLE_FEATURE';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  toggleFeatureSetting(target) {
    this.ngRedux.dispatch({
      type: FeatureToggleActions.TOGGLE_FEATURE,
      payload: target,
    });
  }
}
