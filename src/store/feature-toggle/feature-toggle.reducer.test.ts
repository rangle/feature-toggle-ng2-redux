import { Iterable } from 'immutable';
import { featureToggleReducer } from './feature-toggle.reducer';
import { FeatureToggleActions } from '../../actions/feature-toggle.actions';
import {IToggleRecord} from './feature-toggle.types';

describe('toggleConfig reducer', () => {
  let initState: IToggleRecord;

  beforeEach(() => {
    initState = featureToggleReducer(undefined, { type: 'TEST_INIT '});
  });

  it('should have an immutable initial state', () => {
    expect(Iterable.isIterable(initState)).toBe(true);
  });

  it('should have one object that is the same as passed in', () => {
    const previousValue = initState;
    const testValue = {
      a : {
        setting: true
      }
    };
    const nextState = featureToggleReducer(
      initState,
      { type: FeatureToggleActions.TOGGLE_FEATURE, payload: {toggleConfig : testValue} });
    expect(nextState.size).toEqual(1);
    expect(nextState.get('a')).toEqual(testValue);
  });

});
