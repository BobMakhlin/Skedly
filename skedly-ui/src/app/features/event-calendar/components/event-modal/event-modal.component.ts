import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CalendarEvent} from '../../models/calendar-event.model';
import {NgIf} from '@angular/common';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {EventModalResult, EventModalResultOperation} from '../../models/event-modal-result.model';

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
  public data?: Partial<CalendarEvent> = inject(MAT_DIALOG_DATA);

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    start: [null, Validators.required],
    end: [null, Validators.required]
  });

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
        updateCalendarEvent: this.form.value as Partial<CalendarEvent>,
        operation
      });
    }
  }
}
