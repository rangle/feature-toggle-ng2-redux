import { Iterable } from 'immutable';

import { ToggleFactory } from './feature-toggle.initial-state.ts';
import { featureToggleReducer } from './feature-toggle.reducer';
import { FeatureToggleActions } from '../../actions/feature-toggle.actions';
import { IToggleRecord } from './feature-toggle.types';

describe('toggleConfig reducer', () => {
  describe('on TOGGLE_FEATURE', () => {
    it('updates the corresponding toggles in state', () => {
      const prevState = ToggleFactory({
        feature1: false,
        feature2: false,
      });
      const action = {
        type: FeatureToggleActions.TOGGLE_FEATURE,
        payload: {
          feature2: true,
        },
      };

      const nextState = featureToggleReducer(prevState, action).toJS();

      expect(nextState).toEqual({
        feature1: false,
        feature2: true,
      });
    });
  });
});
