import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ToggleUtil } from '../services/toggle-util';

@Injectable()
export class FeatureToggleActions {
  static TOGGLE_FEATURE = 'TOGGLE_FEATURE';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  toggleFeatureSetting(target) {
    this.ngRedux.dispatch({
      type: FeatureToggleActions.TOGGLE_FEATURE,
      payload: ToggleUtil.stripIds(target),
    });
  }
}
