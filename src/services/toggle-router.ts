import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store/store';
import { featureToggleConfigs } from '../toggle-config';
import { FeatureToggleActions } from '../actions/feature-toggle.actions';
import { IToggleRecord } from '../store/feature-toggle/feature-toggle.types';
import {
  IFeatureToggleConfigSet,
} from '../toggle-config/toggle.config.types';
import { ToggleUtil, ParseResult } from './toggle-util';

@Injectable()
export class ToggleRouter {
  private static configs: IFeatureToggleConfigSet = featureToggleConfigs;
  private toggleConfig$: Observable<IToggleRecord>;
  private toggleRecord: IToggleRecord;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private featureToggleActions: FeatureToggleActions
  ) {
    this.toggleConfig$ = <Observable<IToggleRecord>>this.ngRedux.select('toggles');
    this.toggleConfig$.subscribe((toggleRecord: IToggleRecord) => {
      this.toggleRecord = toggleRecord;
    });
  }

  static getStateFromConfig(configs): any {
      return Object
        .keys(configs)
        .reduce((state, key) => Object.assign({}, state, { [key]: configs[key].setting }), {});
  }

  static getInitialState() {
    return this.getStateFromConfig(ToggleRouter.configs);
  }

  setFeatureState(featureState: Object): void {
    this.featureToggleActions.toggleFeatureSetting(featureState);
  }

  getFeatureState(toggleId) {
    return this.toggleRecord.get(ToggleUtil.parse(toggleId).id);
  }

  /**
   * Returns if a toggle is true or false
   *
   * supports ! as first character to negate
   * supports === in string to check for string equality (e.g. feature1===blue)
   *
   * @param toggleIdExpression
   * @returns {boolean}
   */
  isEnabled(toggleIdExpression: string): boolean {
    let enabled: boolean;
    const parts: ParseResult = ToggleUtil.parse(toggleIdExpression);
    if (parts.hasValue) {
      enabled = this.getFeatureState(parts.id) === parts.value;
    } else {
      const setting = this.getFeatureState(parts.id);
      enabled = (typeof setting === 'function') ? setting() : !!setting;
    }
    return (parts.negated ? !enabled : enabled);
  }

  watch(toggleId: string): Observable<any> {
    toggleId = ToggleUtil.stripId(toggleId);
    return this
      .toggleConfig$
      .pairwise()
      .filter((configSetPair: IToggleRecord[]) => { // stops needless firing
        return configSetPair[0].get(toggleId) !==  configSetPair[1].get(toggleId);
      })
      .map((configSetPair: IToggleRecord[]) => {
        return configSetPair[1].get(toggleId);
      });
  }
}
