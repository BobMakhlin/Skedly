
package io.bobmakhlin.skedlyservice.repository;

import io.bobmakhlin.skedlyservice.domain.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, UUID> {
    List<EventEntity> findByStartDateTimeGreaterThanEqualAndEndDateTimeLessThan(Instant start, Instant end);
}

