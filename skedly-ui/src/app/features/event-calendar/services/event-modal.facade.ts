import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CalendarEvent} from '../models/calendar-event.model';
import {Observable} from 'rxjs';
import {EventModalComponent} from '../components/event-modal/event-modal.component';

@Injectable()
export class EventModalFacadeService {
  private dialog = inject(MatDialog);

  openCreateModal$(): Observable<void> {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: null,
      width: '500px'
    });
    return dialogRef.afterClosed();
  }

  openEditModal$(event: CalendarEvent): Observable<void> {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: event,
      width: '500px'
    });
    return dialogRef.afterClosed();
  }
}
