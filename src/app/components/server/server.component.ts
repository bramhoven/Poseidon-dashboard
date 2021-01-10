import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorModel } from 'src/app/models/poseidon/error.model';
import { ServerStatus } from 'src/app/models/poseidon/server-status.model';
import { Server } from 'src/app/models/poseidon/server.model';
import { PoseidonService } from 'src/app/services/poseidon/poseidon.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  public server: Server;

  constructor(private route: ActivatedRoute, private router: Router, private poseidon: PoseidonService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.poseidon.getServer(params['serverId']).subscribe(server => {
        this.server = server;
      });
   });
  }

  public confirmDeleteServer() {
    const confirmDialot = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm server deletion',
        content: 'Do you really want to delete this server?'
      }
    });

    confirmDialot.afterClosed().subscribe((result: boolean) => {
      if(result === true) {
        this.deleteServer();
      }
    });
  }

  private deleteServer() {
    this.poseidon.deleteServer(this.server.id).subscribe(result => {
      this.router.navigate(['servers']);
    }, (error) => {
      var errorModel = error.error as ErrorModel;
      this.snackBar.open(errorModel.message, '', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }

  public getServerStatus(server: Server): string {
    return ServerStatus[server.status];
  }

  public getServerStatusColor(server: Server): string {
    if(server !== undefined) {
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
    return "unknown";
  }
}
