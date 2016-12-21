import { IPayloadAction } from '../../actions';
import {Action} from 'redux';
import { FeatureToggleActions } from '../../actions';
import { INITIAL_STATE } from './feature-toggle.initial-state';
import { IToggleRecord } from './feature-toggle.types';

export function featureToggleReducer(
  state: IToggleRecord = INITIAL_STATE,
  action: IPayloadAction): IToggleRecord {
    switch (action.type) {
      case FeatureToggleActions.TOGGLE_FEATURE:
        var target = action.payload;

        state.update('toggles', toggles => {
          toggles.map(t => {
            if (t.id === target.id) {
              t.visible = target.visible;
            }

            return t;
          });
        });

        return state;

      default:
        return state;
    }

}
