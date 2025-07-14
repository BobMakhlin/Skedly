import {Component} from '@angular/core';
import {
  EventDetailsContainerComponent
} from '../../features/event-details/components/event-details-container.component';

@Component({
  selector: 'app-event-details-page',
  imports: [
    EventDetailsContainerComponent
  ],
  template: `
    <app-event-details-container></app-event-details-container>
  `
})
export class EventDetailsPageComponent {

}
