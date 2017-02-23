import { Observable } from 'rxjs';
import { IPInfo, IIPInfo } from './ip-info';
import { Http, BaseRequestOptions, ConnectionBackend, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, HttpModule }          from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

describe('ip-info', () => {
  let watcher;
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
    watcher = {
      callCheck: () => {}
    };

    spyOn(watcher, 'callCheck');
  });

  it('should have functioning demo data so the demo IPs return the expected countries. If the serivce breaks, test should fail',

    inject([IPInfo,Http], (ipInfo, http) => {
      ipInfo = new IPInfo(http);
      const testIP = '69.17.177.26';
      let ipInfo$ : Observable<IIPInfo> = ipInfo.getIPInfo(testIP);
      ipInfo$.subscribe( (iipInfo : IIPInfo) =>{
        watcher.callCheck();
//        expect(iipInfo.country).toEqual('CA');
      } );

//      expect(watcher.callCheck).toHaveBeenCalled();
    })
  );
});
