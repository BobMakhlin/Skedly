import {DateTime} from 'luxon';

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
