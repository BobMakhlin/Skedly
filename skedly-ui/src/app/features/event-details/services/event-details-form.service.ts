import {Injectable, OnDestroy} from '@angular/core';
import {Validators} from '@angular/forms';
import {AbstractEventFormService, startBeforeEndValidator} from '../../event/services/event-form.service';
import {Subject, takeUntil, tap} from 'rxjs';
import {applyTimeZone} from '../../../core/utils/date-time.utils';

@Injectable()
export class EventDetailsFormService extends AbstractEventFormService implements OnDestroy {
  public readonly form;
  private readonly _destroy$: Subject<void> = new Subject<void>();
  public updateControlTimezone$ = this.readonlyTimezone.timezone$.pipe(takeUntil(this._destroy$), tap((tz) => {
    const startDateISO = this.getStartDateISOString();
    const endDateISO = this.getEndDateISOString();
    if (startDateISO) {
      this.form.controls.start.setValue(applyTimeZone(startDateISO, tz));
    }
    if (endDateISO) {
      this.form.controls.end.setValue(applyTimeZone(endDateISO, tz));
    }
  }));

  constructor() {
    super();
    this.form = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control(''),
      start: this.fb.control<Date | null>(null, Validators.required),
      end: this.fb.control<Date | null>(null, Validators.required),
      location: this.fb.control(''),
    }, {
      validators: [startBeforeEndValidator()]
    });
    this.updateControlTimezone$.subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private getStartDateISOString(): string | null {
    return (this.form.controls.start.value as Date)?.toISOString();
  }

  private getEndDateISOString(): string | null {
    return (this.form.controls.end.value as Date)?.toISOString();
  }
}
