import { Observable } from 'rxjs';
import { IPInfo, IIPInfo } from './ip-info';
import {
  Http, BaseRequestOptions,
  XHRBackend,
  HttpModule
} from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

describe('ip-info', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ]
    });
    TestBed.configureCompiler(
      {
        providers: [IPInfo, {
          provide: Http,
          deps: [BaseRequestOptions]
        }, XHRBackend ]
      });
  });

  it('should have functioning demo data so the demo IPs return the expected countries. If the serivce breaks, test should fail',
    (done)=>{
      inject([IPInfo,Http], (ipInfo, http) => {
        ipInfo = new IPInfo(http);
        const testIP = '69.17.177.26';
        let ipInfo$: Observable<IIPInfo> = ipInfo.getIPInfo(testIP);
        ipInfo$.subscribe( (iipInfo: IIPInfo) =>{
          expect(iipInfo.countryCode).toEqual('CA');
          done();  // Ensures this was run
        } );
      })(); // Invoke function returned by inject
    }
  );
});
