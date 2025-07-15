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


@Component({
  selector: 'app-event-calendar-container',
  imports: [
    SkedlyUiMonthCalendarComponent
  ],
  providers: [EventApiService, EventModalFacadeService],
  template: `
    <skedly-ui-month-calendar [events]="events" (lazyLoad)="onLazyLoad($event)" (addClick)="onAddClick()"
                              (eventClick)="onEventClick($event)"></skedly-ui-month-calendar>`,
})
export class EventCalendarContainer {
  events = signal<EventInput[]>([]);

  private apiService = inject(EventApiService);
  private eventModalFacade = inject(EventModalFacadeService);
  private router: Router = inject(Router);

  onLazyLoad(event: { start: Date; end: Date; }): void {
    this.apiService.getEvents$(event.start, event.end).pipe(take(1)).subscribe((calendarEvents) => {
      this.events.set(calendarEvents);
    })
  }

  onEventClick(id: string) {
    const eventInput = this.events().find(e => e.id === id);
    if (eventInput) {
      this.eventModalFacade.openEditModal$(eventInputToUpdateCalendarEvent(eventInput)).subscribe(eventModalResult => {
        if (eventModalResult.operation === EventModalResultOperation.OpenEventDetails) {
          this.router.navigate([`/events/${id}`]).then();
        } else if (eventModalResult.operation === EventModalResultOperation.Submit) {
          this.apiService.putEvent$(id, eventModalResult.updateCalendarEvent as UpdateCalendarEvent).pipe(take(1)).subscribe(calendarEvent => {
            this.events.update(events => events.map(event =>
              event === eventInput ? calendarEvent : event
            ));
          })
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
        this.apiService.postEvent$(eventModalResult.updateCalendarEvent as UpdateCalendarEvent).pipe(take(1)).subscribe(calendarEvent => {
          this.events.update(events => [...events, calendarEvent]);
        })
      }
    });
  }
}
