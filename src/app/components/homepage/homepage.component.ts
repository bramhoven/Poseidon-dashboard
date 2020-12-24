import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  private currentDate: Date = new Date();

  public recentEvents: any[] = [
    {timestamp: this.currentDate, message: "Test activity for server #1"},
    {timestamp: this.currentDate, message: "Test activity for server #2"},
    {timestamp: this.currentDate, message: "Test activity for server #3"},
    {timestamp: this.currentDate, message: "Test activity for server #4"},
    {timestamp: this.currentDate, message: "Test activity for server #5"},
    {timestamp: this.currentDate, message: "Test activity for server #6"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  getDateString(date: Date): string {
    console.log(date.getDate())
    var dates = [date.getDate().toString().padStart(2), (date.getMonth()+1).toString().padStart(2), date.getFullYear().toString().padStart(2)];
    var times = [date.getHours().toString().padStart(2), date.getMinutes().toString().padStart(2), date.getSeconds().toString().padStart(2)];
    return `${dates.join('/')} ${times.join(':')}`;
  }
}
