import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {EventModalResult, EventModalResultOperation} from '../../models/event-modal-result.model';
import {UpdateCalendarEvent} from '../../../event/models/add-calendar-event.model';
import {applyTimeZone} from '../../../../core/utils/date-time.utils';
import {READONLY_TIMEZONE} from '../../../../core/timezone/timezone';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule,
    NgIf
  ],
})
export class EventModalComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private dialogRef: MatDialogRef<EventModalComponent, EventModalResult> = inject(MatDialogRef<EventModalComponent, EventModalResult>);
  private readonlyTimezone = inject(READONLY_TIMEZONE);
  public data?: Partial<UpdateCalendarEvent> = inject(MAT_DIALOG_DATA);

  form = this.fb.group({
    title: this.fb.control('', {validators: [Validators.required]}),
    description: this.fb.control(''),
    start: this.fb.control<Date | null>(null, {validators: [Validators.required]}),
    end: this.fb.control<Date | null>(null, {validators: [Validators.required]}),
  });

  constructor() {
    this.patchFormValue();
  }

  onSubmit() {
    this.closeWithResult(EventModalResultOperation.Submit);
  }

  onOpenEventDetails() {
    this.closeWithResult(EventModalResultOperation.OpenEventDetails);
  }

  private closeWithResult(operation: EventModalResultOperation): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close({
        updateCalendarEvent: this.form.value as Partial<UpdateCalendarEvent>,
        operation
      });
    }
  }

  private patchFormValue() {
    if (this.data) {
      const start = this.data.start ? applyTimeZone(this.data.start, this.readonlyTimezone.timezone) : null;
      const end = this.data.end ? applyTimeZone(this.data.end, this.readonlyTimezone.timezone) : null;
      this.form.patchValue({
        ...this.data,
        start,
        end
      });
    }
  }
}
