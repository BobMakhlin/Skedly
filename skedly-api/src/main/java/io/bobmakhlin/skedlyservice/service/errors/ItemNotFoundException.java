package io.bobmakhlin.skedlyservice.service.errors;

import lombok.Getter;

@Getter
public class ItemNotFoundException extends RuntimeException {

    private final String itemId;

    public ItemNotFoundException(Object itemId) {
        super(String.format("Item with id %s not found", itemId));
        this.itemId = itemId.toString();
    }

}