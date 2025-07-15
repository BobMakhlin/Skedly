import {EventInput} from '@fullcalendar/core';
import {UpdateCalendarEvent} from '../models/add-calendar-event.model';

export function eventInputToUpdateCalendarEvent(input: EventInput): UpdateCalendarEvent {
  return {
    title: input.title ?? '',
    start: input.start?.toString() ?? '',
    end: input.end?.toString() ?? '',
  };
}
