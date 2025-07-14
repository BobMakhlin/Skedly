package io.bobmakhlin.skedlyservice.swagger.validation;

import io.bobmakhlin.skedlyservice.swagger.models.UpdateCalendarEvent;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EventTimeRangeValidator implements ConstraintValidator<ValidEventTimeRange, UpdateCalendarEvent> {
    @Override
    public boolean isValid(UpdateCalendarEvent value, ConstraintValidatorContext context) {
        if (value == null || value.getStart() == null || value.getEnd() == null) {
            return true;
        }
        return value.getStart().isBefore(value.getEnd());
    }
}
