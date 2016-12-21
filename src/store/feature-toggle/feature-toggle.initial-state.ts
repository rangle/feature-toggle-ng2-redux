import {
  IFeatureTogglesRecord,
  IFeatureToggles,
  IToggleRecord,
  IToggle,
} from './feature-toggle.types';
import { makeTypedFactory } from 'typed-immutable-record';
export const ToggleFactory = makeTypedFactory<IToggle, IToggleRecord>({
  id: null,
  visible: true,
});

export const INITIAL_TOGGLE_STATE = [
  ToggleFactory({id: 'id1', visible: false}),
  ToggleFactory({id: 'id2', visible: true})
];

export const FeatureToggleFactory = makeTypedFactory<IFeatureToggles, IFeatureTogglesRecord>({
  toggles: INITIAL_TOGGLE_STATE
});

export const INITIAL_STATE = FeatureToggleFactory();