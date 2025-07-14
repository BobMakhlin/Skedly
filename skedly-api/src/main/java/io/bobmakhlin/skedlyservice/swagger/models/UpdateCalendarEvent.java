package io.bobmakhlin.skedlyservice.swagger.models;

import io.bobmakhlin.skedlyservice.swagger.validation.ValidEventTimeRange;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.Instant;

@ValidEventTimeRange
@Schema(description = "Add calendar event model defining the new event structure")
@Data
public class UpdateCalendarEvent {
    @Schema(description = "Title of the event", example = "Meeting with team")
    private String title;

    @Schema(description = "Description of the event", example = "Meeting with team")
    private String description;

    @Schema(description = "Start datetime in ISO 8601 format", example = "2025-07-14T10:00:00Z")
    private Instant start;

    @Schema(description = "End datetime in ISO 8601 format", example = "2025-07-14T11:00:00Z")
    private Instant end;

    @Schema(description = "Event location name", example = "Zoom or Room 305")
    private String location;
}
