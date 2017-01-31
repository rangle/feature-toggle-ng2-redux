import { Component, ViewEncapsulation } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { DevToolsExtension, NgRedux, select } from 'ng2-redux';
import { NgReduxRouter, UPDATE_LOCATION } from 'ng2-redux-router';
import { createEpicMiddleware } from 'redux-observable';

import { IAppState, ISession, rootReducer } from '../store';
import { SessionActions } from '../actions/session.actions';
import { SessionEpics } from '../epics/session.epics';
import { RioAboutPage, RioCounterPage } from '../pages';
import { middleware, enhancers, reimmutify } from '../store';

// (Redux Beacon) imports
import { createMiddleware } from 'redux-beacon';
import { logger } from 'redux-beacon/extensions/logger';
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';

// redux-gtm segment.io lib
// import { segment } from 'redux-beacon/targets/segment';

// (Redux Beacon) EventDefinitionsMap
const eventsMap = {
  'INCREMENT_COUNTER': {
    eventFields: (action, prevState) => ({
      event: 'event',
      hitType: 'event',
      eventCategory: 'Counter',
      eventAction: 'Increment',
    })
  },
  'DECREMENT_COUNTER': {
    eventFields: (action, prevState) => ({
      event: 'event',
      hitType: 'event',
      eventCategory: 'Counter',
      eventAction: 'Decrement',
    })
  },
  'LOGIN_USER_SUCCESS': {
    eventFields: action => ({
      hitType: 'pageview',
      page: `/login_form_completed`,
      title: `Login Form Completed`,
      location: '/login_form_completed'
    })
  },
  [UPDATE_LOCATION]: {
    eventFields: (action, prevState) => ({
      event: 'pageview',
      hitType: 'pageview',
      page: action.payload,
    })
  }
};

import { LoginFormEventsMap } from '../services';
// (Redux Beacon) createMiddleware
// const analyticsMiddleware = createMiddleware(
//   eventsMap,
//   GoogleTagManager,
//   { logger }
// );
// const segmentMiddleware = createMiddleware(
//   eventsMap,
//   segment,
//   { logger }
// );

import {
  RioButton,
  RioNavigator,
  RioNavigatorItem,
  RioLogo,
  RioLoginModal,
  RioToggle
} from '../components';

import {dev} from '../configuration';

@Component({
  selector: 'rio-sample-app',
  // Allow app to define global styles.
  encapsulation: ViewEncapsulation.None,
  styles: [ require('../styles/index.css') ],
  template: require('./sample-app.html')
})
export class RioSampleApp {
  @select(['session', 'hasError']) hasError$: Observable<boolean>;
  @select(['session', 'isLoading']) isLoading$: Observable<boolean>;
  @select(['session', 'user', 'firstName']) firstName$: Observable<string>;
  @select(['session', 'user', 'lastName']) lastName$: Observable<string>;
  @select(s => !!s.session.token) loggedIn$: Observable<boolean>;
  @select(s => !s.session.token) loggedOut$: Observable<boolean>;

  constructor(
    private devTools: DevToolsExtension,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private actions: SessionActions,
    private epics: SessionEpics) {

    middleware.push(createEpicMiddleware(this.epics.login));
    middleware.push(
      createMiddleware(
        Object.assign(eventsMap, LoginFormEventsMap),
        GoogleTagManager
      )
    );

    // middleware.push(segmentMiddleware);

    ngRedux.configureStore(
      rootReducer,
      {},
      middleware,
      devTools.isEnabled() ?
        [ ...enhancers, devTools.enhancer() ] :
        enhancers);

    ngReduxRouter.initialize();
  }
};
