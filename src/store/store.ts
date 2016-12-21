import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import * as counter from './counter';
import * as session from './session';
import * as featureToggle from './feature-toggle';

export interface IAppState {
  counter?: counter.ICounter;
  session?: session.ISession;
  toggles?: featureToggle.IToggle;
};

export const rootReducer = combineReducers<IAppState>({
  counter: counter.counterReducer,
  session: session.sessionReducer,
  toggles: featureToggle.featureToggleReducer,
  router: routerReducer,
});

export function deimmutify(store) {
  return {
    counter: store.counter.toJS(),
    session: store.session.toJS(),
    toggles: store.toggles.toJS(),
    router: store.router,
  };
}

export function reimmutify(plain) {
  return {
    counter: counter.CounterFactory(plain.counter),
    session: session.SessionFactory(plain.session),
    toggles: featureToggle.ToggleFactory(plain.toggles),
    router: plain.router,
  };
}
