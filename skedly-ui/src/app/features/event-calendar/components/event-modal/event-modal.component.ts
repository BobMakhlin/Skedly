import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CalendarEvent} from '../../models/calendar-event.model';
import {NgIf} from '@angular/common';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';

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
  public data?: Partial<CalendarEvent> = inject(MAT_DIALOG_DATA);

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    start: [null, Validators.required],
    end: [null, Validators.required]
  });
  //
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: Partial<CalendarEvent> | null,
  //   // private dialogRef: MatDialogRef<EventModalComponent>
  // ) {
  //   // if (data) this.form.patchValue(data);
  // }

  onSubmit() {
    if (this.form.valid) {
      // this.dialogRef.close(this.form.value);
    }
  }

  onDetails() {
    // this.dialogRef.close({action: 'details', id: this.data?.id});
  }
}
