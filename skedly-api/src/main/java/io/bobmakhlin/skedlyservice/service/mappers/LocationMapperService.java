package io.bobmakhlin.skedlyservice.service.mappers;

import io.bobmakhlin.skedlyservice.domain.LocationEntity;
import io.bobmakhlin.skedlyservice.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationMapperService {
    private final LocationRepository locationRepository;

    public LocationEntity findOrCreate(String name) {
        if (StringUtils.isEmpty(name)) {
            return null;
        }
        return locationRepository.findByName(name)
                .orElseGet(() -> locationRepository.saveAndFlush(LocationEntity.builder().name(name).build()));
    }
}
