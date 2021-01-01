import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

import { Statistics } from 'src/app/models/poseidon/statistics.model';
import { Server } from 'src/app/models/poseidon/server.model';

@Injectable({
  providedIn: 'root'
})
export class PoseidonService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics> {
    var url = `${environment.poseidon.host}/statistics`;
    return this.http.get<Statistics>(url);
  }

  getServers(): Observable<Server[]> {
    var url = `${environment.poseidon.host}/servers`;
    return this.http.get<Server[]>(url);
  }
}
