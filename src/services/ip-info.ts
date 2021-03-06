
import {Injectable} from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface IIPInfo {
  ip: string;
  status?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
  query?: string;
}

@Injectable()
export class IPInfo {
  private ipURL = 'http://ip-api.com/json/';

  constructor (private http: Http) {}

  getIPInfo(ip: string = ''): Observable<IIPInfo> {
    return this.http.get(this.ipURL + ip)
      .map(IPInfo.extractData)
      .map(  (ipInfo: IIPInfo) => { // Tack on IP
        return Object.assign({}, ipInfo, {ip: ip});
      })
      .catch(IPInfo.handleError);
  }

  private static extractData(res: Response) {
    return res.json() || { };
  }

  private static handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
