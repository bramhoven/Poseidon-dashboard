import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PoseidonService } from 'src/app/services/poseidon/poseidon.service';
import {Server} from 'src/app/models/poseidon/server.model';

@Component({
  selector: 'server-overview',
  templateUrl: './server-overview.component.html',
  styleUrls: ['./server-overview.component.scss']
})
export class ServerOverviewComponent implements OnInit, AfterViewInit {
  private servers: Server[] = [];

  public displayedColumns: string[] = ['id', 'name', 'status', 'ip address'];
  public dataSource = new MatTableDataSource<Server>(this.servers);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private poseidon: PoseidonService) {
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

  refresh() {
    this.dataSource = new MatTableDataSource<Server>(this.servers);
  }
}
