import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import {NgReduxRouterModule} from '@angular-redux/router';
import {
  routing,
  appRoutingProviders
} from './sample-app.routing';
import {
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {RioSampleApp} from './sample-app';
import {SessionActions, FeatureToggleActions} from '../actions';
import {SessionEpics} from '../epics/session.epics';
import {
  RioAboutPage,
  RioCounterPage
} from '../pages';
import {RioCounter} from '../components/counter/counter.component';
import {RioLoginModule} from '../components/login/login.module';
import {RioUiModule} from '../components/ui/ui.module';
import {RioModalModule} from '../components/modal/modal.module';
import {RioNavigatorModule} from '../components/navigator/navigator.module';

import {
  ShowIfFeatureDirective
} from '../directives/';
import {ToggleRouter} from '../services/toggle-router';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    routing,
    CommonModule,
    RioLoginModule,
    RioUiModule,
    RioNavigatorModule,
    RioModalModule,
    NgReduxModule,
    NgReduxRouterModule,
  ],
  declarations: [
    RioSampleApp,
    RioAboutPage,
    RioCounterPage,
    RioCounter,
    ShowIfFeatureDirective
  ],
  bootstrap: [
    RioSampleApp
  ],
  providers: [
    FormBuilder,
    appRoutingProviders,
    SessionActions,
    SessionEpics,
    FeatureToggleActions,
    ToggleRouter
  ]
})
export class RioSampleAppModule { }
