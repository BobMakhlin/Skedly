import {EventInput} from '@fullcalendar/core';
import {UpdateCalendarEvent} from '../models/add-calendar-event.model';
import {CalendarEvent} from '../models/calendar-event.model';

export function eventInputToUpdateCalendarEvent(input: EventInput): UpdateCalendarEvent {
  return {
    title: input.title ?? '',
    start: input.start?.toString() ?? '',
    end: input.end?.toString() ?? '',
  };
}

export function updateEventFromChanges(calendarEvent: CalendarEvent, update: Partial<UpdateCalendarEvent> | null): UpdateCalendarEvent {
  if (!update) {
    return {...calendarEvent};
  }
  const definedUpdate = Object.fromEntries(
    Object.entries(update).filter(([_, v]) => v !== undefined)
  ) as Partial<UpdateCalendarEvent>;

  return {
    ...calendarEvent,
    ...definedUpdate,
  };
}
