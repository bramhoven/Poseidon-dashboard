import { Component, OnInit } from '@angular/core';
import { Statistics } from 'src/app/models/poseidon/statistics.model';
import { PoseidonService } from 'src/app/services/poseidon/poseidon.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public statistics: Statistics = new Statistics(0, 0);
  private currentDate: Date = new Date();

  public recentEvents: any[] = [
    {timestamp: this.currentDate, message: "Test a fake event for server #1"},
    {timestamp: this.currentDate, message: "Test a fake event for server #2"},
    {timestamp: this.currentDate, message: "Test a fake event for server #3"},
    {timestamp: this.currentDate, message: "Test a fake event for server #4"},
    {timestamp: this.currentDate, message: "Test a fake event for server #5"},
    {timestamp: this.currentDate, message: "Test a fake event for server #6"},
  ]

  constructor(private poseidon: PoseidonService) { }

  ngOnInit(): void {
    this.poseidon.getStatistics().subscribe(statistics => {
      this.statistics = statistics;
    });
  }

  getDateString(date: Date): string {
    var dates = [date.getDate().toString().padStart(2), (date.getMonth()+1).toString().padStart(2), date.getFullYear().toString().padStart(2)];
    var times = [date.getHours().toString().padStart(2), date.getMinutes().toString().padStart(2), date.getSeconds().toString().padStart(2)];
    return `${dates.join('/')} ${times.join(':')}`;
  }
}
