import {Component} from '@angular/core';
import {EventCalendarContainer} from '../features/event-calendar/components/containers/event-calendar.container';


@Component({
  selector: 'app-calendar-page',
  imports: [
    EventCalendarContainer
  ],
  template: `
    <app-event-calendar-container></app-event-calendar-container>`
})
export class CalendarPageComponent {
}
