import { IPayloadAction } from '../../actions';
import {Action} from 'redux';
import { FeatureToggleActions } from '../../actions';
import { INITIAL_STATE } from './feature-toggle.initial-state';
import { IFeatureTogglesRecord } from './feature-toggle.types';

console.log('INITIAL_STATE', INITIAL_STATE)

export function featureToggleReducer(
  state: IFeatureTogglesRecord = INITIAL_STATE,
  action: IPayloadAction): IFeatureTogglesRecord {
    console.log('state', state)
    // state true

    // Array

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
