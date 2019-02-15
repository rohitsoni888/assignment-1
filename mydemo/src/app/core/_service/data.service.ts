import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    sUrl: any;

    constructor(private http: Http) {}

    rowDataAPI(cb: any) {
        //var headers = new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        //return this.http.get(this.sUrl, {headers: headers}).map(res => res);

        const req = new XMLHttpRequest();
        req.open('GET', this.sUrl);

        req.onload = () => {
            const data = JSON.parse(req.response);
            cb(data.hits);
        };

        req.send();
    }

    setUrl(url: any) {
        this.sUrl = url;
    };
}