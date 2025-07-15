package io.bobmakhlin.skedlyservice.swagger.api;

import io.bobmakhlin.skedlyservice.swagger.models.CalendarEvent;
import io.bobmakhlin.skedlyservice.swagger.models.UpdateCalendarEvent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/events")
@Tag(name = "Calendar Events", description = "Manage calendar events")
public class EventController {

    private final EventApiDelegate eventApiDelegate;

    public EventController(EventApiDelegate eventApiDelegate) {
        this.eventApiDelegate = eventApiDelegate;
    }

    @GetMapping
    @Operation(summary = "Get all events in date range")
    public List<CalendarEvent> getEvents(
            @RequestParam @Parameter(description = "Start date") Instant startDate,
            @RequestParam @Parameter(description = "End date") Instant endDate
    ) {
        return eventApiDelegate.getEventsInRange(startDate, endDate);
    }

    @PostMapping
    @Operation(summary = "Create new event")
    public CalendarEvent create(@Valid @RequestBody UpdateCalendarEvent updateCalendarEvent) {
        return eventApiDelegate.create(updateCalendarEvent);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing event")
    public CalendarEvent update(@PathVariable UUID id, @Valid @RequestBody UpdateCalendarEvent updateCalendarEvent) {
        return eventApiDelegate.update(id, updateCalendarEvent);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an event by ID")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        eventApiDelegate.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event by ID")
    public CalendarEvent getEventById(@PathVariable UUID id) {
        return eventApiDelegate.getEventById(id);
    }
}
