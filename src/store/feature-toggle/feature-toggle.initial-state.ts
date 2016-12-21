import {
  IToggleRecord,
  IToggle,
} from './feature-toggle.types';
import { makeTypedFactory } from 'typed-immutable-record';

const defaultToggle = {
  id1: false,
  id2: true
};

export const ToggleFactory = makeTypedFactory<IToggle, IToggleRecord>(defaultToggle);

export const INITIAL_STATE = ToggleFactory();
