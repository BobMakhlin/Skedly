package io.bobmakhlin.skedlyservice.swagger.models;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Schema(description = "Calendar event exposed via API")
@Data
public class CalendarEvent {
    @Schema(description = "Event ID", example = "b39d7880-b17f-4c61-93ef-eabc8f5378b4")
    private UUID id;

    @Schema(description = "Title of the event", example = "Meeting with team")
    private String title;

    @Schema(description = "Start datetime in ISO 8601 format", example = "2025-07-14T10:00:00Z")
    private Instant start;

    @Schema(description = "End datetime in ISO 8601 format", example = "2025-07-14T11:00:00Z")
    private Instant end;

    @Schema(description = "Event location name", example = "Zoom or Room 305")
    private String location;
}
