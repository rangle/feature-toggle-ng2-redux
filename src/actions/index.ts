import { Action } from 'redux';
import { CounterActions } from './counter.actions';
import { InputActions } from './input.actions';
import { SessionActions } from './session.actions';
import { FeatureToggleActions } from './feature-toggle.actions';

export interface IPayloadAction extends Action {
  payload?: any;
}

export const ACTION_PROVIDERS = [
  CounterActions,
  InputActions,
  SessionActions,
  FeatureToggleActions,
];

export {
  CounterActions,
  InputActions,
  SessionActions,
  FeatureToggleActions,
};
