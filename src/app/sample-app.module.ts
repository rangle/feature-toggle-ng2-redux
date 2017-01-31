import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {
  NgRedux,
  NgReduxModule,
  DevToolsExtension,
} from 'ng2-redux';
import {NgReduxRouter} from 'ng2-redux-router';
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
import {RioNavigatorModule} from '../components/navigator/navigator.module';

import {
  ShowIfFeatureDirective,
  HideIfFeatureDirective
} from '../directives/';

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
    NgReduxModule.forRoot(),
  ],
  declarations: [
    RioSampleApp,
    RioAboutPage,
    RioCounterPage,
    RioCounter,
    ShowIfFeatureDirective,
    HideIfFeatureDirective
  ],
  bootstrap: [
    RioSampleApp
  ],
  providers: [
    DevToolsExtension,
    FormBuilder,
    NgReduxRouter,
    appRoutingProviders,
    SessionActions,
    SessionEpics,
    FeatureToggleActions
  ]
})
export class RioSampleAppModule { }
