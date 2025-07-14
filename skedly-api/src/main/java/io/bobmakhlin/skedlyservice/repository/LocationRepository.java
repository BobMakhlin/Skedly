package io.bobmakhlin.skedlyservice.repository;

import io.bobmakhlin.skedlyservice.domain.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, UUID> {
    Optional<LocationEntity> findByName(String name);
}
