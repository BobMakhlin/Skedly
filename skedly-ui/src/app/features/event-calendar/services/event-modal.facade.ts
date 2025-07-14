import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CalendarEvent} from '../models/calendar-event.model';
import {Observable} from 'rxjs';
import {EventModalComponent} from '../components/event-modal/event-modal.component';
import {EventModalResult} from '../models/event-modal-result.model';

@Injectable()
export class EventModalFacadeService {
  private dialog = inject(MatDialog);

  openCreateModal$(): Observable<EventModalResult> {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: null,
      width: '500px'
    });
    return dialogRef.afterClosed();
  }

  openEditModal$(event: CalendarEvent): Observable<EventModalResult> {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: event,
      width: '500px'
    });
    return dialogRef.afterClosed();
  }
}
