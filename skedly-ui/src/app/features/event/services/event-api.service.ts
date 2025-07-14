import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CalendarEvent} from '../models/calendar-event.model';
import {EnvService} from '../../../core/env/env.service';
import {UpdateCalendarEvent} from '../models/add-calendar-event.model';

@Injectable()
export class EventApiService {
  constructor(private http: HttpClient, private env: EnvService) {
  }

  getEvents$(startDate: Date, endDate: Date): Observable<CalendarEvent[]> {
    console.log('API URL:', this.env.apiUrl);

    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    return this.http.get<CalendarEvent[]>(`${this.env.apiUrl}/events`, {params});
  }

  postEvent$(event: UpdateCalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.env.apiUrl}/events`, event);
  }

  putEvent$(eventId: string, event: UpdateCalendarEvent): Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(`${this.env.apiUrl}/events/${eventId}`, event);
  }

  deleteEvent$(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.env.apiUrl}/events/${eventId}`);
  }
}
