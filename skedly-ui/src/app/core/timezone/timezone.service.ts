import {Injectable} from '@angular/core';
import {ReadonlyTimezone, WritableTimezone} from './timezone';
import {BehaviorSubject, defer, EMPTY, Observable, of} from 'rxjs';

const DEFAULT_TIMEZONE = 'UTC';

/**
 * Timezone priority:
 * 1) user defined timezone persisted in localstorage;
 * 2) browser timezone;
 * 3) default timezone - UTC.
 */
@Injectable()
export class TimezoneService implements ReadonlyTimezone, WritableTimezone {
  private readonly _timezone$ = new BehaviorSubject<string>(this.readInitialTimezone());

  availableTimezones$: Observable<string[]> = of(Intl.supportedValuesOf?.('timeZone') ?? ['UTC']);
  timezone$ = this._timezone$;

  setTimezone$(tz: string): Observable<void> {
    return defer(() => {
      localStorage.setItem('timezone', tz);
      this._timezone$.next(tz);
      return EMPTY;
    });
  }

  resetTimezone$(): Observable<void> {
    return defer(() => {
      localStorage.removeItem('timezone');
      this._timezone$.next(this.readInitialTimezone());
      return EMPTY;
    });
  }

  private readInitialTimezone(): string {
    const userDefinedTimezone = localStorage.getItem('timezone');
    return userDefinedTimezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? DEFAULT_TIMEZONE;
  }
}
