import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorModel } from 'src/app/models/poseidon/error.model';
import { HealthCheck } from 'src/app/models/poseidon/health-check.model';
import { PoseidonService } from 'src/app/services/poseidon/poseidon.service';
import { PqlInfoDialogComponent } from '../pql-info-dialog/pql-info-dialog.component';

@Component({
  selector: 'query-healthchecks',
  templateUrl: './query-healthchecks.component.html',
  styleUrls: ['./query-healthchecks.component.scss']
})
export class QueryHealthchecksComponent implements AfterViewInit {
  public queryControl: FormControl = new FormControl('');
  public errorMessage: string;
  public healthChecks: HealthCheck[];

  public dataSource = new MatTableDataSource<HealthCheck>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  public isLoadingResults: boolean = false;

  public displayedColumns: string[] = ['date', 'server', 'data-items'];

  constructor(private poseidon: PoseidonService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public runQuery() {
    this.isLoadingResults = true;
    this.poseidon.runHealthCheckQuery(this.queryControl.value).subscribe(healthChecks => {
      for(let healthCheck of healthChecks)
        healthCheck.date = new Date(healthCheck.date);
      this.healthChecks = healthChecks;

      this.dataSource = new MatTableDataSource<HealthCheck>(this.healthChecks);
      if(this.paginator)
        this.dataSource.paginator = this.paginator;

      this.errorMessage = '';
      this.isLoadingResults = false;
    },
    error => {
      var errorModel = error.error as ErrorModel;
      this.errorMessage = errorModel.message;
      this.isLoadingResults = false;
    });
  }

  public openPQLInfo() {
    this.dialog.open(PqlInfoDialogComponent, {});
  } 

  public getHealthCheckDataItems(healthCheck: HealthCheck): string {
    let dataItems = [];

    for(let dataItem of healthCheck.dataItems) {
      dataItems.push(`${dataItem.name}: <b>${dataItem.data}</b>`);
    }

    return dataItems.join("&nbsp; &nbsp; - &nbsp; &nbsp; ");
  }

  public showErrorMessage(): boolean {
    return this.errorMessage?.length > 0;
  }

  public showResultTable(): boolean {
    return this.healthChecks?.length > 0;
  }
}
