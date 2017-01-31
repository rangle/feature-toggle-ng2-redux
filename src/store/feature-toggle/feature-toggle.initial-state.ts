import {
  IToggleRecord,
  IToggle,
} from './feature-toggle.types';
import { makeTypedFactory } from 'typed-immutable-record';
import { toggleRouter } from '../../services';

const defaultToggle = toggleRouter.getInitialState();

export const ToggleFactory = makeTypedFactory<IToggle, IToggleRecord>(
  defaultToggle
);

export const INITIAL_STATE = ToggleFactory();
