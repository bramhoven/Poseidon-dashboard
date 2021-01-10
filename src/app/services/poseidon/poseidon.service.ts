import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

import { Statistics } from 'src/app/models/poseidon/statistics.model';
import { Server } from 'src/app/models/poseidon/server.model';
import { ServerImage } from 'src/app/models/poseidon/server-image.model';
import { CloudProvider } from 'src/app/models/poseidon/cloud-provider.model';
import { ServerSize } from 'src/app/models/poseidon/server-size.model';
import { Region } from 'src/app/models/poseidon/region.model';
import { PublicSshKey } from 'src/app/models/poseidon/public-ssh-key.model';
import { CreateServerRequest } from 'src/app/models/poseidon/requests/create-server-request.model';
import { HealthCheck } from 'src/app/models/poseidon/health-check.model';

@Injectable({
  providedIn: 'root'
})
export class PoseidonService {

  constructor(private http: HttpClient) { }

  getProviders(): Observable<CloudProvider[]> {
    var url = `${environment.poseidon.host}/poseidon/providers`;
    return this.http.get<CloudProvider[]>(url);
  }

  getStatistics(): Observable<Statistics> {
    var url = `${environment.poseidon.host}/statistics`;
    return this.http.get<Statistics>(url);
  }

  getServers(): Observable<Server[]> {
    var url = `${environment.poseidon.host}/poseidon/servers`;
    return this.http.get<Server[]>(url);
  }

  getServer(serverId: string): Observable<Server> {
    var url = `${environment.poseidon.host}/poseidon/servers/${serverId}`;
    return this.http.get<Server>(url);
  }

  deleteServer(serverId: string): Observable<any> {
    var url = `${environment.poseidon.host}/poseidon/servers/${serverId}`;
    return this.http.delete<any>(url);
  }

  getRegions(provider: CloudProvider): Observable<Region[]> {
    var url = `${environment.poseidon.host}/${provider.slug}/regions`;
    return this.http.get<Region[]>(url);
  }

  getSizes(provider: CloudProvider): Observable<ServerSize[]> {
    var url = `${environment.poseidon.host}/${provider.slug}/sizes`;
    return this.http.get<ServerSize[]>(url);
  }

  getImages(provider: CloudProvider): Observable<ServerImage[]> {
    var url = `${environment.poseidon.host}/${provider.slug}/images`;
    return this.http.get<ServerImage[]>(url);
  }

  getSshKeys(provider: CloudProvider): Observable<PublicSshKey[]> {
    var url = `${environment.poseidon.host}/${provider.slug}/sshkeys`;
    return this.http.get<PublicSshKey[]>(url);
  }

  createServer(provider: CloudProvider, server: CreateServerRequest): Observable<Server> {
    var url = `${environment.poseidon.host}/${provider.slug}/servers`;
    return this.http.post<Server>(url, server);
  }

  getHealthChecks(serverId: string): Observable<HealthCheck[]> {
    var url = `${environment.poseidon.host}/poseidon/servers/${serverId}/healthchecks`;
    return this.http.get<HealthCheck[]>(url);
  }

  runHealthCheckQuery(query: string): Observable<HealthCheck[]> {
    var url = `${environment.poseidon.host}/healthchecks/query?query=${query}`;
    return this.http.get<HealthCheck[]>(url);
  }
}
