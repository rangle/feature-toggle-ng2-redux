import { IAppState, rootReducer, deimmutify, reimmutify } from './store';
import { ICounter } from './counter';
import { ISession } from './session';
import { IFeatureToggles } from './feature-toggle';

import { dev } from '../configuration';
const createLogger = require('redux-logger');
const persistState = require('redux-localstorage');

export {
  IAppState,
  ISession,
  ICounter,
  IFeatureToggles,
  rootReducer,
  reimmutify,
};

export let middleware = [];
export let enhancers = [
  persistState(
    '',
    {
      key: 'angular2-redux-seed',
      serialize: store => JSON.stringify(deimmutify(store)),
      deserialize: state => reimmutify(JSON.parse(state)),
    })
];

if (dev) {
  middleware.push(
    createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer: deimmutify,
  }));
}
