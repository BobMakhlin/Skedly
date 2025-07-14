import {Component, inject, signal} from '@angular/core';
import {EventInput} from '@fullcalendar/core';
import {SkedlyUiMonthCalendarComponent} from '../skedly-ui-month-calendar.component';
import {EventApiService} from '../../services/event-api.service';
import {take} from 'rxjs';
import {EventModalFacadeService} from '../../services/event-modal.facade';


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

  onLazyLoad(event: { start: Date; end: Date; }): void {
    this.apiService.getEvents$(event.start, event.end).pipe(take(1)).subscribe((calendarEvents) => {
      this.events.set(calendarEvents);
    })
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
    this.eventModalFacade.openCreateModal$().pipe(take(1)).subscribe();
  }

  editEvent(updated: EventInput) {
    this.events.update(events =>
      events.map(event =>
        event.id === updated.id ? {...event, ...updated} : event
      )
    );
  }
}
