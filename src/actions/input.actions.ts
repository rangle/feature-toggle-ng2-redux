import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

/**
 * This class is for ReduxBeacon to track changes on input fields
 */
@Injectable()
export class InputActions {
  time: number = 0;

  constructor(private ngRedux: NgRedux<IAppState>){}

  /**
   * function to call when starting to edit an input field
   */
  startEditing(fieldName: string) {
    this.time = Date.now();
    this.ngRedux.dispatch({ type: `${fieldName}_START`});
  }

  /**
   * function to call when finishing editing an input field
   * @param {string} fieldName - the name of the current input field
   * @param {string} status - the status of the form control
   * @param {string} error - the error of the form control
   */
  finishEditing(fieldName: string, status: string, error?:string) {
    this.time = Date.now() - this.time;
    this.ngRedux.dispatch({
      type: `${fieldName}_FINISH`,
      payload: {
        status,
        error,
        time: this.time,
      },
    })
  }
}