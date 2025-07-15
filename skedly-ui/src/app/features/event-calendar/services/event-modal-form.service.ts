import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {AbstractEventFormService, startBeforeEndValidator} from '../../event/services/event-form.service';

@Injectable()
export class EventModalFormService extends AbstractEventFormService {
  public readonly form;

  constructor() {
    super();
    this.form = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control(''),
      start: this.fb.control<Date | null>(null, Validators.required),
      end: this.fb.control<Date | null>(null, Validators.required),
    }, {
      validators: [startBeforeEndValidator()]
    });
  }
}
