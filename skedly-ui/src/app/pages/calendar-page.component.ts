import {Component} from '@angular/core';
import {MonthCalendarContainer} from '../features/month-calendar/components/month-calendar.container';


@Component({
  selector: 'app-calendar-page',
  imports: [
    MonthCalendarContainer
  ],
  template: `
    <app-calendar-container></app-calendar-container> `
})
export class CalendarPageComponent {
}
