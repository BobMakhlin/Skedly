import {DateTime} from 'luxon';


// This solution is problematic:
// Consider using moment lib and adapter to make it work with mat-datetimepicker.

export function applyTimeZone(utcIso: string, timeZone: string): Date {
  const dt = DateTime.fromISO(utcIso, {zone: timeZone});
  return DateTime.local(
    dt.year,
    dt.month,
    dt.day,
    dt.hour,
    dt.minute
  ).toJSDate();
}
