import { TypedRecord } from 'typed-immutable-record';

export interface IToggle {
  [id: string]: any;
};

export interface IToggleRecord extends TypedRecord<IToggleRecord>,
  IToggle {};
