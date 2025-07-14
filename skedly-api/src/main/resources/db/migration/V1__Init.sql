CREATE TABLE location
(
    id   BINARY(16) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE event
(
    id             BINARY(16) PRIMARY KEY,
    title          VARCHAR(255) NOT NULL,
    description    TEXT,
    start_datetime DATETIME     NOT NULL,
    end_datetime   DATETIME     NOT NULL,
    location_id    BINARY(16),
    CONSTRAINT fk_event_location FOREIGN KEY (location_id) REFERENCES location (id)
);
