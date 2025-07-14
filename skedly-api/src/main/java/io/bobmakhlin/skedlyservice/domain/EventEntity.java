package io.bobmakhlin.skedlyservice.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "event")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventEntity {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_datetime", nullable = false)
    private Instant startDateTime;

    @Column(name = "end_datetime", nullable = false)
    private Instant endDateTime;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private LocationEntity location;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        EventEntity that = (EventEntity) o;
        return Objects.equals(getId(), that.getId())
                && Objects.equals(getTitle(), that.getTitle())
                && Objects.equals(getDescription(), that.getDescription())
                && Objects.equals(getStartDateTime(), that.getStartDateTime())
                && Objects.equals(getEndDateTime(), that.getEndDateTime());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getDescription(), getStartDateTime(), getEndDateTime());
    }
}