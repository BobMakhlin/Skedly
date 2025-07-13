import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SkedlyHeaderComponent} from './core/layout/skedly-header/skedly-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SkedlyHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
