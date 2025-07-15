import {Component, effect, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, take} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Location, NgIf} from '@angular/common';
import {UpdateCalendarEvent} from '../../event/models/add-calendar-event.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EventApiService} from '../../event/services/event-api.service';
import {updateEventFromChanges} from '../../event/mappers/event.mapper';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {EventDetailsFormService} from '../services/event-details-form.service';

@Component({
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [EventDetailsFormService, EventApiService],
  selector: 'app-event-details-container',
  standalone: true,
  styleUrl: './event-details-container.component.scss',
  templateUrl: './event-details-container.component.html'
})
export class EventDetailsContainerComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private formService = inject(EventDetailsFormService);
  private apiService = inject(EventApiService);
  private id = toSignal(this.route.paramMap.pipe(map(p => p.get('id'))), {initialValue: null});
  private readonly routeState: Partial<UpdateCalendarEvent>;

  public form: FormGroup = this.formService.form;
  public isLoading = signal(false);

  constructor() {
    this.routeState = this.router.getCurrentNavigation()?.extras.state as Partial<UpdateCalendarEvent>;

    effect(() => {
      const id = this.id();
      if (!id) {
        return;
      }
      if (id === 'new') {
        this.onCreate();
      } else {
        this.onUpdate(id);
      }
    });

    this.location.replaceState(this.router.url);
  }

  private onCreate(): void {
    if (this.routeState) {
      this.formService.patchValue(this.routeState);
    }
  }

  private onUpdate(id: string): void {
    this.isLoading.set(true);
    this.apiService.getEvent$(id).pipe(take(1)).subscribe(calendarEvent => {
      this.formService.patchValue(updateEventFromChanges(calendarEvent, this.routeState));
      this.isLoading.set(false);
    });
  }

  onSave(): void {
    if (this.id() === 'new') {
      this.apiService.postEvent$(this.formService.getValue() as UpdateCalendarEvent).pipe(take(1)).subscribe(calendarEvent => {
        this.router.navigateByUrl(`/events/${calendarEvent.id}`).then();
      })
    } else {
      this.apiService.putEvent$(this.id() as string, this.formService.getValue() as UpdateCalendarEvent).pipe(take(1)).subscribe(calendarEvent => {
        this.formService.patchValue(calendarEvent);
      })
    }
  }

  onDelete(): void {
    this.apiService.deleteEvent$(this.id() as string).pipe(take(1))
      .subscribe(() => {
        this.router.navigateByUrl('/').then();
      })
  }
}
