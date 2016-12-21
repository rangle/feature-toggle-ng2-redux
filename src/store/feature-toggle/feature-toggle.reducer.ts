import { IPayloadAction } from '../../actions';
import { FeatureToggleActions } from '../../actions';
import { INITIAL_STATE } from './feature-toggle.initial-state';
import { IToggleRecord } from './feature-toggle.types';

export function featureToggleReducer(
  state: IToggleRecord = INITIAL_STATE,
  action: IPayloadAction): IToggleRecord {
    switch (action.type) {
      case FeatureToggleActions.TOGGLE_FEATURE:
        const { id, visible } = action.payload;
        return state.update(id, value => visible);

      default:
        return state;
    }

}
