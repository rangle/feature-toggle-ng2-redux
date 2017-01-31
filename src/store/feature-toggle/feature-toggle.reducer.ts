import { IPayloadAction } from '../../actions';
import { FeatureToggleActions, SessionActions } from '../../actions';
import { INITIAL_STATE } from './feature-toggle.initial-state';
import { IToggleRecord } from './feature-toggle.types';
import { toggleRouter } from '../../services';

export function featureToggleReducer(
  state: IToggleRecord = INITIAL_STATE,
  action: IPayloadAction
): IToggleRecord {
    switch (action.type) {

      case FeatureToggleActions.TOGGLE_FEATURE:
        const payload = action.payload;
        // toggleRouter.setFeatureState(payload);
        return state.updateIn([payload.id], val => {
          val.isEnabled = payload.isEnabled;
          return val;
        });

      case SessionActions.LOGOUT_USER:
        return state.merge(INITIAL_STATE);

      default:
        return state;
    }
}
