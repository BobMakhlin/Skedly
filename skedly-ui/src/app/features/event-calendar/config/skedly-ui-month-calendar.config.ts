import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone'

export interface MonthCalendarHandlers {
  onAddClick(): void;

  onLazyLoad(range: { start: Date; end: Date }): void;

  onEventClick(id: string): void;
}

export function createMonthCalendarOptions(
  handlers: MonthCalendarHandlers
): CalendarOptions {
  return {
    plugins: [dayGridPlugin, interactionPlugin, momentTimezonePlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'customAddEvent'
    },
    customButtons: {
      customAddEvent: {
        text: 'Add Event',
        click: handlers.onAddClick,
      }
    },
    datesSet: (args) => handlers.onLazyLoad({start: args.start, end: args.end}),
    eventClick: (args) => handlers.onEventClick(args.event.id),
    weekends: true,
    height: '80vh',
    initialView: 'dayGridMonth',
  };
}
