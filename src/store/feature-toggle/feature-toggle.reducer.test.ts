import { ToggleFactory } from './feature-toggle.initial-state';
import { featureToggleReducer } from './feature-toggle.reducer';
import { FeatureToggleActions } from '../../actions/feature-toggle.actions';

describe('toggleConfig reducer', () => {
  describe('on TOGGLE_FEATURE', () => {
    it('updates the corresponding toggles in state', () => {
      const prevState = ToggleFactory();
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
        cta: 'contact'
      });
    });
  });
});
