import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PoseidonService } from 'src/app/services/poseidon/poseidon.service';
import {Server} from 'src/app/models/poseidon/server.model';
import { Router } from '@angular/router';
import { ServerStatus } from 'src/app/models/poseidon/server-status.model';

@Component({
  selector: 'server-overview',
  templateUrl: './server-overview.component.html',
  styleUrls: ['./server-overview.component.scss']
})
export class ServerOverviewComponent implements OnInit, AfterViewInit {
  private servers: Server[] = [];

  public displayedColumns: string[] = ['status', 'id', 'name', 'ip address'];
  public dataSource = new MatTableDataSource<Server>(this.servers);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private poseidon: PoseidonService, private router: Router) {
  }

  ngOnInit() {
    this.poseidon.getServers().subscribe(servers => {
      this.servers = servers;
      this.refresh();
    });
  }

  ngAfterViewInit() {
    if(this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  gotoServer(server: Server) {
    this.router.navigate([`servers/${server.id}`]);
  }

  refresh() {
    this.dataSource = new MatTableDataSource<Server>(this.servers);
    if(this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  getServerStatus(server: Server): string {
    return ServerStatus[server.status];
  }

  getServerStatusColor(server: Server): string {
    switch(server.status){
      case ServerStatus.Failing:
        return "failing";
      case ServerStatus.Offline:
        return "offline";
      case ServerStatus.Unknown:
        return "unknown";
      case ServerStatus.Running:
        return "running";
      case ServerStatus.Slow:
        return "slow";
    }
  }
}
