import { Action } from 'redux';
import { CounterActions } from './counter.actions';
import { SessionActions } from './session.actions';
import { FeatureToggleActions } from './feature-toggle.actions';

export interface IPayloadAction extends Action {
  payload?: any;
}

export const ACTION_PROVIDERS = [
  CounterActions,
  SessionActions,
  FeatureToggleActions
];

export { CounterActions, SessionActions, FeatureToggleActions };
