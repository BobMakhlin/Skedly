import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarOptions, DateSelectArg, EventClickArg, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarModule} from '@fullcalendar/angular';

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
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


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'skedly-ui';


  calendarEvents = signal(INITIAL_EVENTS);

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin,
    ],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth'
    },
    datesSet: (e) => {
      console.log('DATES SET, e:', e);
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: (e) => {
      console.log('EVENTS SET, e:', e); //?
    },
    eventAdd: (e) => {
      console.log('EVENT ADD, e:', e);
    },
    eventChange: (e) => {
      console.log('EVENT CHANGE, e:', e);
    },
    eventRemove: (e) => {
      console.log('EVENT REMOVE, e:', e);
    },
    select: this.handleDateSelect.bind(this),
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: '10',
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

}
