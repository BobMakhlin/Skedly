import {inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {UpdateCalendarEvent} from '../models/add-calendar-event.model';
import {applyTimeZone} from '../../../core/utils/date-time.utils';
import {READONLY_TIMEZONE} from '../../../core/timezone/timezone';

export function startBeforeEndValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    if (start && end && start >= end) {
      return {startAfterEnd: true};
    }
    return null;
  };
}

export abstract class AbstractEventFormService {
  protected readonly fb = inject(FormBuilder);
  protected readonlyTimezone = inject(READONLY_TIMEZONE);

  abstract readonly form: FormGroup;

  patchValue(value: Partial<UpdateCalendarEvent>): void {
    const start = value.start ? applyTimeZone(value.start, this.readonlyTimezone.timezone) : null;
    const end = value.end ? applyTimeZone(value.end, this.readonlyTimezone.timezone) : null;
    this.form.patchValue({
      ...value,
      start,
      end
    });
  }

  getValue(): Partial<UpdateCalendarEvent> {
    const val = this.form.value;
    return {
      ...val,
      start: val.start?.toISOString(),
      end: val.end?.toISOString()
    };
  }
}

