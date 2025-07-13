import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions, EventInput} from '@fullcalendar/core';
import {createMonthCalendarOptions} from '../config/month-calendar.config';

@Component({
  selector: 'app-month-calendar',
  imports: [
    FullCalendarModule
  ],
  template: `
    <full-calendar [events]="events()" [options]="calendarOptions">
      <ng-template #eventContent let-arg>
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </ng-template>
    </full-calendar>
  `,
})
export class MonthCalendarComponent {
  @Input({ required: true }) events = signal<EventInput[]>([]);
  @Output() public lazyLoad: EventEmitter<{
    start: Date;
    end: Date;
  }> = new EventEmitter();
  @Output() public addClick: EventEmitter<void> = new EventEmitter();
  @Output() public eventClick: EventEmitter<string> = new EventEmitter();

  calendarOptions: CalendarOptions = createMonthCalendarOptions({
    onAddClick: () => this.addClick.emit(),
    onLazyLoad: ({start, end}) => this.lazyLoad.emit({start, end: end}),
    onEventClick: (id) => this.eventClick.emit(id)
  });
}
