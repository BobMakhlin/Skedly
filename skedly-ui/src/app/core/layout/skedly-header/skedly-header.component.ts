import {Component, Inject} from '@angular/core';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {READONLY_TIMEZONE, ReadonlyTimezone, WRITABLE_TIMEZONE, WritableTimezone} from '../../timezone/timezone';
import {Observable, take} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-skedly-header',
  imports: [
    MatToolbar,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    AsyncPipe,
    NgForOf,
  ],
  template: `
    <mat-toolbar color="primary">
      <div class="brand">
        <mat-icon fontSet="material-symbols-outlined">event</mat-icon>
        <span class="app-title">Skedly</span>
      </div>

      <span class="spacer"></span>

      <mat-form-field appearance="fill" subscriptSizing="dynamic">
        <mat-select [value]="timezone$ | async" (selectionChange)="onTimezoneChange($event.value)">
          <mat-option *ngFor="let tz of availableTimezones$ | async" [value]="tz">
            {{ tz }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-toolbar>
  `,
  styleUrl: './skedly-header.component.scss'
})
export class SkedlyHeaderComponent {
  public readonly availableTimezones$: Observable<string[]>;
  public readonly timezone$: Observable<string>;

  constructor(@Inject(READONLY_TIMEZONE) readonlyTimezone: ReadonlyTimezone, @Inject(WRITABLE_TIMEZONE) private writableTimezone: WritableTimezone) {
    this.availableTimezones$ = readonlyTimezone.availableTimezones$;
    this.timezone$ = readonlyTimezone.timezone$;
  }

  onTimezoneChange(tz: string) {
    this.writableTimezone.setTimezone$(tz).pipe(take(1)).subscribe();
  }
}
