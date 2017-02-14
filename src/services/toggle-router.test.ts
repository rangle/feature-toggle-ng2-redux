import { Observable } from 'rxjs';

import { IToggleRecord } from '../store/feature-toggle/feature-toggle.types';
import { featureToggleReducer } from '../store/feature-toggle/feature-toggle.reducer';
import { FeatureToggleActions } from '../actions/feature-toggle.actions';
import { ToggleRouter } from './toggle-router';

describe('toggle router', () => {
  describe('getStateFromConfig(config)', () => {
    it('returns the toggles state from a config object', () => {
      const configs = {
        'feature1': { setting: false },
        'feature2': { setting: true },
      };

      const state = ToggleRouter.getStateFromConfig(configs);

      expect(state).toEqual({
        'feature1': false,
        'feature2': true,
      });
    });
  });

  // let initState: IToggleRecord;
  // let toggleRouter : ToggleRouter;  // TODO: How do I instance this?
  // beforeEach(() => {
  //   initState = featureToggleReducer(undefined, { type: 'TEST_INIT '});
  //   // TODO: how do I initialize the router used by toggleRouter
  // });

  // it('should return the value that was set', () => {
  //   toggleRouter.setFeatureState({key: 'value'});
  //   expect(toggleRouter.getFeatureState('key')).toBe('value');
  // });

  // it('should fire when watched value changed', () => {

  //   const callChecker = () => {};

  //   const toggleSetting$ : Observable<any> = toggleRouter.watch('watchedToggle');

  //   toggleSetting$.subscribe( (newValue) => {
  //     expect(newValue).toBe('watched value');
  //     callChecker();  // TODO: Is this how I check that this was called? Will it work asynchronously?
  //   });

  //   toggleRouter.setFeatureState('watched value');
  //   expect(callChecker).toHaveBeenCalled();

  // });
});
