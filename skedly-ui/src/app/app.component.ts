import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {MonthCalendarComponent} from './features/month-calendar/month-calendar.component';
import {EventInput} from '@fullcalendar/core';

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

const EVENTS_1: EventInput[] = [
  {
    id: '1',
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: '2',
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: '3',
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
];

export const EVENTS_2: EventInput[] = [
  {
    id: '101',
    title: 'Morning Standup',
    start: `${TODAY_STR}T09:00:00`,
    end: `${TODAY_STR}T09:30:00`,
  },
  {
    id: '102',
    title: 'Design Review',
    start: `${TODAY_STR}T11:00:00`,
    end: `${TODAY_STR}T12:00:00`,
  },
  {
    id: '103',
    title: 'Lunch Break',
    start: `${TODAY_STR}T12:30:00`,
    end: `${TODAY_STR}T13:30:00`,
  },
  {
    id: '104',
    title: 'Project Sync',
    start: `${TODAY_STR}T14:00:00`,
    end: `${TODAY_STR}T15:00:00`,
  },
  {
    id: '105',
    title: 'All-day Conference',
    start: TODAY_STR,
    allDay: true,
  },
];


@Component({
  selector: 'app-root',
  imports: [MonthCalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  events = signal<EventInput[]>([]);

  onLazyLoad(): void {
    console.log('lazy load')
    if (this.events().length === 0) {
      this.events.set(EVENTS_1);
    } else {
      this.events.set(EVENTS_2);
    }
  }

  onEventClick(id: string) {
    this.editEvent({
      id,
      title: 'Updated Timed Event',
      start: '2025-07-15T08:00:00',
      end: '2025-07-15T09:00:00'
    });
  }

  onAddClick() {
    this.events.update(events => [
      ...events,
      {
        id: '106',
        title: 'New Meeting',
        start: '2025-07-14T10:00:00',
        end: '2025-07-14T11:00:00',
      }
    ]);
  }

  editEvent(updated: EventInput) {
    this.events.update(events =>
      events.map(event =>
        event.id === updated.id ? { ...event, ...updated } : event
      )
    );
  }

}
