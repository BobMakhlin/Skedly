import {UpdateCalendarEvent} from '../../event/models/add-calendar-event.model';

export enum EventModalResultOperation {
  Submit,
  OpenEventDetails
}

export interface EventModalResult {
  updateCalendarEvent?: Partial<UpdateCalendarEvent>;
  operation: EventModalResultOperation;
}
