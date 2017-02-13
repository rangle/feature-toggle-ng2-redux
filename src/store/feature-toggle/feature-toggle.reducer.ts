import { IPayloadAction } from '../../actions';
import { FeatureToggleActions, SessionActions } from '../../actions';
import { INITIAL_STATE } from './feature-toggle.initial-state';
import { IToggleRecord } from './feature-toggle.types';

export function featureToggleReducer(
  state: IToggleRecord = INITIAL_STATE,
  action: IPayloadAction
): IToggleRecord {
  switch (action.type) {
  case FeatureToggleActions.TOGGLE_FEATURE:
    const payload = action.payload;
    return state.merge(payload);
  default:
    return state;
  }
}
