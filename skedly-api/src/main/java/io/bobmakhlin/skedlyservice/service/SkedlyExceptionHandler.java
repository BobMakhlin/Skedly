package io.bobmakhlin.skedlyservice.service;

import io.bobmakhlin.skedlyservice.service.errors.ItemNotFoundException;
import io.bobmakhlin.skedlyservice.swagger.models.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice()
@Order(1)
public class SkedlyExceptionHandler {
    @ExceptionHandler(value = ItemNotFoundException.class)
    public ResponseEntity<Object> handleItemNotFoundException(ItemNotFoundException ex) {
        log.error("Item not found exception {}", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(buildErrorResponse("NotFound", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationError(MethodArgumentNotValidException ex) {
        var body = new HashMap<String, Object>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Validation failed");

        var fieldErrors = new HashMap<String, String>();
        ex.getBindingResult().getFieldErrors().forEach((fieldError) ->
                fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage())
        );

        // For class-level errors like @ValidEventTimeRange.
        ex.getBindingResult().getGlobalErrors().forEach(error ->
                fieldErrors.put(error.getObjectName(), error.getDefaultMessage())
        );

        body.put("violations", fieldErrors);

        return ResponseEntity.badRequest().body(body);
    }

    private ErrorResponse buildErrorResponse(String code, String message) {
        var response = new ErrorResponse();
        response.setCode(code);
        response.setMessage(message);
        return response;
    }
}
