import {
  IToggleRecord,
  IToggle,
} from './feature-toggle.types';
import { makeTypedFactory } from 'typed-immutable-record';

const defaultToggle = {};

export const ToggleFactory = makeTypedFactory<IToggle, IToggleRecord>(defaultToggle);

export const INITIAL_STATE = ToggleFactory({
  id1: false,
  id2: true
});

// export const FeatureToggleFactory = makeTypedFactory<IFeatureToggles, IFeatureTogglesRecord>({
//   toggles: INITIAL_TOGGLE_STATE
// });
//
// export const INITIAL_STATE = FeatureToggleFactory();
