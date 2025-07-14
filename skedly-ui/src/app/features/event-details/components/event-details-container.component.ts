import {Component, effect, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {JsonPipe, NgIf} from '@angular/common';

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
  private id = toSignal(this.route.paramMap.pipe(map(p => p.get('id'))), { initialValue: null });

  // event = signal<CalendarEvent | null>(null);
  initialData = signal<any | null>(null);

  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) {
        return;
      }
      if (id === 'new') {
        this.initialData.set(window.history.state || {});
      } else {
        // this.eventService.getEventById(id).subscribe((e) => this.event.set(e));
      }
    });
  }

  isNew() {
    return this.id() === 'new';
  }
}
