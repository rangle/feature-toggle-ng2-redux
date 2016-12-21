import { TypedRecord } from 'typed-immutable-record';

export interface IToggle {
  id: string;
  visible: boolean;
};

export interface IToggleRecord extends TypedRecord<IToggleRecord>,
  IToggle {};

export interface IFeatureToggles {
  toggles: IToggle[];
};

export interface IFeatureTogglesRecord extends TypedRecord<IFeatureTogglesRecord>,
  IFeatureToggles {};
