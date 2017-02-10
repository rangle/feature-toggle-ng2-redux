// doesn't work when running tests

import { featureToggleConfigs } from '../toggle-config';

import {FeatureToggleActions} from '../actions/feature-toggle.actions';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAppState} from '../store/store';
import {NgRedux} from 'ng2-redux';
import {IFeatureToggleConfig, IFeatureToggleConfigSet} from '../toggle-config/toggle.config.types';
import {IToggleRecord} from '../store/feature-toggle/feature-toggle.types';

@Injectable()
export class ToggleRouter {
  private static configs : IFeatureToggleConfigSet = featureToggleConfigs;
  private toggleConfig$ : Observable<IToggleRecord> ;
  private toggleRecord : IToggleRecord;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private featureToggleActions : FeatureToggleActions) {
    this.toggleConfig$ =  // TODO This cast might be dangerous
      <Observable<IToggleRecord>>this.ngRedux.select('toggles');
    this.toggleConfig$.subscribe( (toggleRecord : IToggleRecord) => {
      this.toggleRecord = toggleRecord;
    });
  }

  static getInitialState() {
    const initialState = {};
    Object.keys(ToggleRouter.configs).forEach((key) => {
      const config : IFeatureToggleConfig = ToggleRouter.configs[key];
      initialState[key] = config.setting;
    });

    return initialState;
  }
  setFeatureState(featureState) : void {
    this.featureToggleActions.toggleFeatureSetting(featureState);
  }

  getFeatureState(toggleId) {
    return this.toggleRecord.get(toggleId);
  }

  watch (toggleId : string) : Observable<any> {
    // TODO: This will fire whenever any toggle changes,
    // fix it so it only fires when needed
    return this.toggleConfig$.map( (configSet : IToggleRecord) => {
      return configSet.get(toggleId);
    } );

  }
}

