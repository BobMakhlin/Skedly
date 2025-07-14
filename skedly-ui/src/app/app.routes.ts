import {Routes} from '@angular/router';
import {CalendarPageComponent} from './pages/calendar/calendar-page.component';

export const routes: Routes = [
  {path: '', component: CalendarPageComponent},
  {
    path: 'events/:id',
    loadChildren: () => import('./pages/event-details/event-details.routes').then((m) => m.routes),
  }
];
