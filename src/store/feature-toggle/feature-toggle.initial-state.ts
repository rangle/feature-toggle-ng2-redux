import {
  IToggleRecord,
  IToggle,
} from './feature-toggle.types';
import { makeTypedFactory } from 'typed-immutable-record';
import { ToggleRouter } from '../../services';

const defaultToggle = ToggleRouter.getInitialState();

export const ToggleFactory = makeTypedFactory<IToggle, IToggleRecord>(
  defaultToggle
);

export const INITIAL_STATE = ToggleFactory();
