package io.bobmakhlin.skedlyservice.service;

import io.bobmakhlin.skedlyservice.repository.EventRepository;
import io.bobmakhlin.skedlyservice.service.errors.ItemNotFoundException;
import io.bobmakhlin.skedlyservice.service.mappers.EventMapper;
import io.bobmakhlin.skedlyservice.swagger.api.EventApiDelegate;
import io.bobmakhlin.skedlyservice.swagger.models.CalendarEvent;
import io.bobmakhlin.skedlyservice.swagger.models.UpdateCalendarEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventApiDelegateImpl implements EventApiDelegate {
    private final EventMapper eventMapper;
    private final EventRepository eventRepository;

    @Transactional(readOnly = true)
    @Override
    public List<CalendarEvent> getEventsInRange(Instant start, Instant end) {
        var entities = eventRepository.findByStartDateTimeGreaterThanEqualAndEndDateTimeLessThan(start, end);
        return eventMapper.eventEntitiesToCalendarEvents(entities);
    }

    @Transactional
    @Override
    public CalendarEvent create(UpdateCalendarEvent updateCalendarEvent) {
        var eventEntity = eventMapper.updateCalendarEventToEventEntity(updateCalendarEvent);
        var savedEntity = eventRepository.saveAndFlush(eventEntity);
        return eventMapper.eventEntityToCalendarEvent(savedEntity);
    }

    @Transactional
    @Override
    public CalendarEvent update(UUID id, UpdateCalendarEvent updateCalendarEvent) {
        var entity = eventRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
        eventMapper.updateCalendarEvent(updateCalendarEvent, entity);
        var savedEntity = eventRepository.saveAndFlush(entity);
        return eventMapper.eventEntityToCalendarEvent(savedEntity);
    }

    @Transactional
    @Override
    public void delete(UUID id) {
        var entity = eventRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
        eventRepository.delete(entity);
    }
}
