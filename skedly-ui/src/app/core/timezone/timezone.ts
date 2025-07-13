import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';

export interface ReadonlyTimezone {
  timezone$: Observable<string>;

  availableTimezones$: Observable<string[]>;
}

export interface WritableTimezone {
  setTimezone$(tz: string): Observable<void>;

  resetTimezone$(): Observable<void>;
}

export const READONLY_TIMEZONE = new InjectionToken<ReadonlyTimezone>('Readonly Timezone');
export const WRITABLE_TIMEZONE = new InjectionToken<WritableTimezone>('Writable Timezone');
