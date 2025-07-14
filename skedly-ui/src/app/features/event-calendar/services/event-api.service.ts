import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CalendarEvent} from '../models/calendar-event.model';
import {EnvService} from '../../../core/env/env.service';

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
//
// const EVENTS_1: CalendarEvent[] = [
//   {
//     id: '2',
//     title: 'Timed event',
//     start: TODAY_STR + 'T00:00:00',
//     end: TODAY_STR + 'T03:00:00'
//   },
//   {
//     id: '3',
//     title: 'Timed event',
//     start: TODAY_STR + 'T12:00:00',
//     end: TODAY_STR + 'T15:00:00'
//   }
// ];
//
// export const EVENTS_2: CalendarEvent[] = [
//   {
//     id: '101',
//     title: 'Morning Standup',
//     start: `${TODAY_STR}T09:00:00`,
//     end: `${TODAY_STR}T09:30:00`,
//   },
//   {
//     id: '102',
//     title: 'Design Review',
//     start: `${TODAY_STR}T11:00:00`,
//     end: `${TODAY_STR}T12:00:00`,
//   },
//   {
//     id: '103',
//     title: 'Lunch Break',
//     start: `${TODAY_STR}T12:30:00`,
//     end: `${TODAY_STR}T13:30:00`,
//   },
//   {
//     id: '104',
//     title: 'Project Sync',
//     start: `${TODAY_STR}T14:00:00`,
//     end: `${TODAY_STR}T15:00:00`,
//   }
// ];

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
    // return of(EVENTS_2);
  }

  postEvent$(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.env.apiUrl}/events/`, event);
  }

  putEvent$(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(`${this.env.apiUrl}/events/${event.id}`, event);
  }

  deleteEvent$(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.env.apiUrl}/events/${eventId}`);
  }
}
