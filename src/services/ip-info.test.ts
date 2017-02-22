import { Observable } from 'rxjs';
import { IPInfo, IIPInfo } from './ip-info';
import { Http, Response }          from '@angular/http';

// Questions:
// How should this be tested? Ping the real IP? or mock the HTTP? or both?
// When pinging real IP, How shold the IPInfo be instanced
// https://semaphoreci.com/community/tutorials/testing-angular-2-http-services-with-jasmine
//    fail: import { addProviders, inject } from '@angular/core/testing';

describe('ip-info', () => {
  const testIP = '69.17.177.26';


  it('should return an observable)', () => {



  })
});
