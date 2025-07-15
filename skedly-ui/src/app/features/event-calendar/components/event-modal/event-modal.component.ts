import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
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
import {EventBasicFormService} from '../../../event/services/event-basic-form.service';

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
    NgIf,
  ],
  providers: [EventBasicFormService]
})
export class EventModalComponent {
  private formService = inject(EventBasicFormService);
  private dialogRef: MatDialogRef<EventModalComponent, EventModalResult> = inject(MatDialogRef<EventModalComponent, EventModalResult>);
  public data?: Partial<UpdateCalendarEvent> = inject(MAT_DIALOG_DATA);
  public readonly form = this.formService.form;

  constructor() {
    if (this.data) {
      this.formService.patchValue(this.data);
    }
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
        updateCalendarEvent: this.formService.getValue(),
        operation
      });
    }
  }
}
