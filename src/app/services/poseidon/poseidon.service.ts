import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {environment} from '../../../environments/environment';

import { Statistics } from 'src/app/models/poseidon/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class PoseidonService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics> {
    var url = `${environment.poseidon.host}/statistics`;
    return this.http.get<Statistics>(url);
  }
}
