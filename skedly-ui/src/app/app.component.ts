import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SkedlyHeaderComponent} from './core/layout/skedly-header/skedly-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SkedlyHeaderComponent],
  template: `
    <app-skedly-header></app-skedly-header>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
