import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {TimezoneService} from './timezone.service';
import {READONLY_TIMEZONE, WRITABLE_TIMEZONE} from './timezone';

export function provideTimezone(): EnvironmentProviders {
  return makeEnvironmentProviders([
    TimezoneService,
    {
      provide: WRITABLE_TIMEZONE,
      useExisting: TimezoneService,
    },
    {
      provide: READONLY_TIMEZONE,
      useExisting: TimezoneService,
    },
  ]);
}
