package io.bobmakhlin.skedlyservice.swagger.api;

import io.bobmakhlin.skedlyservice.swagger.models.UpdateCalendarEvent;
import io.bobmakhlin.skedlyservice.swagger.models.CalendarEvent;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface EventApiDelegate {
    List<CalendarEvent> getEventsInRange(Instant start, Instant end);

    CalendarEvent create(UpdateCalendarEvent updateCalendarEvent);

    CalendarEvent update(UUID id, UpdateCalendarEvent updateCalendarEvent);

    void delete(UUID id);

    CalendarEvent getEventById(UUID id);
}
