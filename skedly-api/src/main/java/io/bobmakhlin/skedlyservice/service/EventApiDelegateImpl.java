package io.bobmakhlin.skedlyservice.service;

import io.bobmakhlin.skedlyservice.swagger.api.EventApiDelegate;
import io.bobmakhlin.skedlyservice.swagger.models.CalendarEvent;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class EventApiDelegateImpl implements EventApiDelegate {
    @Override
    public List<CalendarEvent> getEventsInRange(Instant start, Instant end) {
        return List.of();
    }

    @Override
    public CalendarEvent create(CalendarEvent dto) {
        return null;
    }

    @Override
    public CalendarEvent update(CalendarEvent dto) {
        return null;
    }

    @Override
    public void delete(UUID id) {

    }
}
