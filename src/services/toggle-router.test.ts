import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { featureToggleReducer } from '../store/feature-toggle/feature-toggle.reducer';
import { FeatureToggleActions } from '../actions/feature-toggle.actions';
import { ToggleRouter } from './toggle-router';
import { TestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { combineReducers } from 'redux';
import {
  platformBrowserDynamicTesting,
  BrowserDynamicTestingModule
} from  '@angular/platform-browser-dynamic/testing';
import {IAppState} from "../store/store";

class MockNgZone {
  run(fn) {
    return fn();
  }
}

describe('toggle router', () => {
  describe('getStateFromConfig(config)', () => {
    it('returns the toggles state from a config object', () => {
      const configs = {
        'feature1': { setting: false },
        'feature2': { setting: true },
        'cta': {setting: 'contact'}
      };

      const state = ToggleRouter.getStateFromConfig(configs);

      expect(state).toEqual({
        'feature1': false,
        'feature2': true,
        'cta': 'contact'
      });
    });
  });

  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );


  describe('router operations', () => {
    let ngRedux;
    let callChecker;
    let toggleSetting$: Observable<any>;
    let toggleRouter: ToggleRouter;
    beforeEach(() => {
      ngRedux = new NgRedux(new MockNgZone() as NgZone);
      let featureToggleActions: FeatureToggleActions = new FeatureToggleActions(ngRedux);
      toggleRouter  = new ToggleRouter(ngRedux, featureToggleActions);
      TestBed.configureTestingModule({
        providers: [
          {provide: NgRedux, useValue: ngRedux},
          {provide: FeatureToggleActions, useValue: featureToggleActions},
          {provide: ToggleRouter, useValue: toggleRouter}
        ],
      });

      const rootReducer = combineReducers<IAppState>({
        toggles: featureToggleReducer
      });

      ngRedux.configureStore(
        rootReducer,
        {},
        [],
        []);

      callChecker = {
        watch: (val) => {}
      };
      spyOn(callChecker, 'watch');
      toggleSetting$ = toggleRouter.watch('cta');
      toggleSetting$.subscribe( (newValue) => {
        callChecker.watch(newValue);
      });
      toggleRouter.setFeatureState({cta: 'value'});

    });

    it('should return the value that was set', () => {
      expect(toggleRouter.getFeatureState('cta')).toBe('value');
    });

    it('watcher should be called', () => {
      expect(callChecker.watch).toHaveBeenCalledWith('value');
    });


    it('should throw when setting a toggle not defined in config', () => {
      const wrap = () => {
        toggleRouter.setFeatureState({notThere: 'value'});
      };
      expect(wrap).toThrowError();
    });
  });

});
