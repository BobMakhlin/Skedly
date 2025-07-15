import {Component, inject, signal} from '@angular/core';
import {EventInput} from '@fullcalendar/core';
import {SkedlyUiMonthCalendarComponent} from '../skedly-ui-month-calendar.component';
import {EventApiService} from '../../../event/services/event-api.service';
import {filter, take} from 'rxjs';
import {EventModalFacadeService} from '../../services/event-modal.facade';
import {EventModalResultOperation} from '../../models/event-modal-result.model';
import {Router} from '@angular/router';
import {UpdateCalendarEvent} from '../../../event/models/add-calendar-event.model';
import {eventInputToUpdateCalendarEvent} from '../../../event/mappers/event.mapper';
import {READONLY_TIMEZONE} from '../../../../core/timezone/timezone';
import {AsyncPipe} from '@angular/common';
import {CalendarEvent} from '../../../event/models/calendar-event.model';


@Component({
  selector: 'app-event-calendar-container',
  imports: [
    SkedlyUiMonthCalendarComponent,
    AsyncPipe
  ],
  providers: [EventApiService, EventModalFacadeService],
  template: `
    <skedly-ui-month-calendar [timeZone]="activeTimezone$ | async" [events]="events" (lazyLoad)="onLazyLoad($event)"
                              (addClick)="onAddClick()"
                              (eventClick)="onEventClick($event)"></skedly-ui-month-calendar>`,
})
export class EventCalendarContainer {
  events = signal<EventInput[]>([]);

  private apiService = inject(EventApiService);
  private eventModalFacade = inject(EventModalFacadeService);
  private router: Router = inject(Router);
  private readonlyTimezone = inject(READONLY_TIMEZONE);
  public activeTimezone$ = this.readonlyTimezone.timezone$;

  onLazyLoad(event: { start: Date; end: Date; }): void {
    this.apiService.getEvents$(event.start, event.end).pipe(take(1)).subscribe((calendarEvents) => {
      this.events.set(calendarEvents);
    })
  }

  onEventClick(id: string) {
    const eventInput = this.events().find(e => e.id === id);
    if (eventInput) {
      this.eventModalFacade.openEditModal$(eventInputToUpdateCalendarEvent(eventInput)).pipe(take(1), filter(Boolean)).subscribe(eventModalResult => {
        if (eventModalResult.operation === EventModalResultOperation.OpenEventDetails) {
          this.router.navigate([`/events/${id}`], {
            state: eventModalResult.updateCalendarEvent,
          }).then();
        } else if (eventModalResult.operation === EventModalResultOperation.Submit) {
          this.apiService.putEvent$(id, eventModalResult.updateCalendarEvent as UpdateCalendarEvent).pipe(take(1)).subscribe(calendarEvent => this.replaceEvent(eventInput, calendarEvent));
        }
      });
    }
  }

  onAddClick() {
    this.eventModalFacade.openCreateModal$().pipe(take(1), filter(Boolean)).subscribe(eventModalResult => {
      if (eventModalResult.operation === EventModalResultOperation.OpenEventDetails) {
        this.router.navigate(['/events/new'], {
          state: eventModalResult.updateCalendarEvent,
        }).then();
      } else if (eventModalResult.operation === EventModalResultOperation.Submit) {
        this.apiService.postEvent$(eventModalResult.updateCalendarEvent as UpdateCalendarEvent).pipe(take(1)).subscribe(calendarEvent => this.addEvent(calendarEvent));
      }
    });
  }

  private addEvent(calendarEvent: CalendarEvent): void {
    this.events.update(events => [...events, calendarEvent]);
  }

  private replaceEvent(oldEvent: EventInput, newEvent: CalendarEvent): void {
    this.events.update(events => events.map(event =>
      event === oldEvent ? newEvent : event
    ));
  }
}
