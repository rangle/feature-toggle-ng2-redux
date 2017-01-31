import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { toggleRouter } from '../services';

@Injectable()
export class FeatureToggleActions {
  static TOGGLE_FEATURE = 'TOGGLE_FEATURE';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  toggleFeatureVisibility(target) {
    this.ngRedux.dispatch({
      type: FeatureToggleActions.TOGGLE_FEATURE,
      payload: target,
    });
  }
}
