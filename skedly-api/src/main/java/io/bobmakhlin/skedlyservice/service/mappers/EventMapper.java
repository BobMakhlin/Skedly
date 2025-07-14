package io.bobmakhlin.skedlyservice.service.mappers;

import io.bobmakhlin.skedlyservice.domain.EventEntity;
import io.bobmakhlin.skedlyservice.swagger.models.CalendarEvent;
import io.bobmakhlin.skedlyservice.swagger.models.UpdateCalendarEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = LocationMapperService.class)
public interface EventMapper {
    @Mapping(source = "start", target = "startDateTime")
    @Mapping(source = "end", target = "endDateTime")
    EventEntity updateCalendarEventToEventEntity(UpdateCalendarEvent updateCalendarEvent);

    @Mapping(source = "start", target = "startDateTime")
    @Mapping(source = "end", target = "endDateTime")
    void updateCalendarEvent(UpdateCalendarEvent updateCalendarEvent, @MappingTarget EventEntity entity);

    @Mapping(source = "startDateTime", target = "start")
    @Mapping(source = "endDateTime", target = "end")
    @Mapping(source = "location.name", target = "location")
    CalendarEvent eventEntityToCalendarEvent(EventEntity entity);

    List<CalendarEvent> eventEntitiesToCalendarEvents(List<EventEntity> entities);
}
