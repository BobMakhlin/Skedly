import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';

import {routes} from './app.routes';
import {provideTimezone} from './core/timezone/timezone.provider';
import {provideHttpClient} from '@angular/common/http';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(MatNativeDatetimeModule), provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimations(), provideTimezone(), provideHttpClient()],
};
