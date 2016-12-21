import { TypedRecord } from 'typed-immutable-record';

export interface IToggle {
};

export interface IToggleRecord extends TypedRecord<IToggleRecord>,
  IToggle {};
