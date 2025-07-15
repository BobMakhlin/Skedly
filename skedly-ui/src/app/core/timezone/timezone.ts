import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';

export interface ReadonlyTimezone {
  readonly timezone$: Observable<string>;

  readonly availableTimezones$: Observable<string[]>;

  get timezone(): string;
}

export interface WritableTimezone {
  setTimezone$(tz: string): Observable<void>;

  resetTimezone$(): Observable<void>;
}

export const READONLY_TIMEZONE = new InjectionToken<ReadonlyTimezone>('Readonly Timezone');
export const WRITABLE_TIMEZONE = new InjectionToken<WritableTimezone>('Writable Timezone');
