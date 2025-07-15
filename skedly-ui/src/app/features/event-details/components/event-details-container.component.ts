import {Component, DestroyRef, effect, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {JsonPipe, NgIf} from '@angular/common';
import {UpdateCalendarEvent} from '../../event/models/add-calendar-event.model';

@Component({
  standalone: true,
  selector: 'app-event-details-container',
  imports: [
    NgIf,
    JsonPipe
  ],
  templateUrl: './event-details-container.component.html',
  styleUrl: './event-details-container.component.scss'
})
export class EventDetailsContainerComponent {
  private route = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  private id = toSignal(this.route.paramMap.pipe(map(p => p.get('id'))), {initialValue: null});

  initialData = signal<Partial<UpdateCalendarEvent> | null>(null);

  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) {
        return;
      }
      const updateCalendarEvent: Partial<UpdateCalendarEvent> = window.history.state || {};
      if (id === 'new') {
        this.initialData.set(updateCalendarEvent);
      } else {
        console.log('Edit mode window.history.state', updateCalendarEvent);
        // this.eventService.getEventById(id).subscribe((e) => this.event.set(e));
      }
    });
  }

  isNew() {
    return this.id() === 'new';
  }
}
