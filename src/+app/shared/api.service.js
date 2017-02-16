import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export let ApiService = class ApiService {
    constructor(_http) {
        this._http = _http;
    }
    /**
     * whatever domain/feature method name
     */
    get(url, options) {
        return this._http.get(url, options)
            .map(res => res.json())
            .catch(err => {
            console.log('Error: ', err);
            return Observable.throw(err);
        });
    }
};
