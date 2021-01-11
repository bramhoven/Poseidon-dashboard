import { Component, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { HealthCheck } from 'src/app/models/poseidon/health-check.model';
import { Server } from 'src/app/models/poseidon/server.model';
import { PoseidonService } from 'src/app/services/poseidon/poseidon.service';

@Component({
  selector: 'healthcheck-graph',
  templateUrl: './healthcheck-graph.component.html',
  styleUrls: ['./healthcheck-graph.component.scss']
})
export class HealthcheckGraphComponent {
  private _server: Server;

  @Input()
  get server(): Server {
    return this._server;
  }
  set server(server: Server) {
    this._server = server;
    this.getHealthChecks();
  }

  private healthChecks: HealthCheck[];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private poseidon: PoseidonService) {
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  private getHealthChecks() {
    if(this.server?.id !== undefined) {
      this.poseidon.getHealthChecks(this.server.id).subscribe(healthChecks => {
        this.healthChecks = healthChecks;
        this.createChartDate();
      });
    }
  }

  private createChartDate() {
    let data: {[id: string]: number[]} = {};
    this.lineChartLabels = [];
    for(let i = 0; i < this.healthChecks.length; i++) {
      let healthCheck = this.healthChecks[i];
      var date = new Date(healthCheck.date);
      date.setHours(date.getHours() -1);
      this.lineChartLabels.push(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
      for(let dataItem of healthCheck.dataItems) {
        if(!(dataItem.name in data))
          data[dataItem.name] = [].fill(0, 0, this.healthChecks.length);
        
          data[dataItem.name][i] = dataItem.data;
      }
    }

    this.lineChartData = [];
    for(let label in data) {
      this.lineChartData.push(
        {data: data[label], label: label}
      )
    }
  }
}
