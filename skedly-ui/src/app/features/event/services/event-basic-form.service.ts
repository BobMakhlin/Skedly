import {inject, Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UpdateCalendarEvent} from '../models/add-calendar-event.model';
import {applyTimeZone} from '../../../core/utils/date-time.utils';
import {READONLY_TIMEZONE} from '../../../core/timezone/timezone';

@Injectable()
export class EventBasicFormService {
  private fb = inject(FormBuilder);
  private readonlyTimezone = inject(READONLY_TIMEZONE);

  public form = this.fb.group({
    title: this.fb.control('', {validators: [Validators.required]}),
    description: this.fb.control(''),
    start: this.fb.control<Date | null>(null, {validators: [Validators.required]}),
    end: this.fb.control<Date | null>(null, {validators: [Validators.required]}),
  });

  public patchValue(value: Partial<UpdateCalendarEvent>): void {
    const start = value.start ? applyTimeZone(value.start, this.readonlyTimezone.timezone) : null;
    const end = value.end ? applyTimeZone(value.end, this.readonlyTimezone.timezone) : null;
    this.form.patchValue({
      ...value,
      start,
      end
    });
  }
}
